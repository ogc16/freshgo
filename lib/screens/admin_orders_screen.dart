import 'dart:developer' as dev;
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/order_provider.dart';
import '../utils/formatters.dart';
import '../utils/admin.dart';
import '../widgets/ui.dart';

class AdminOrdersScreen extends StatefulWidget {
  final VoidCallback onBack;
  const AdminOrdersScreen({super.key, required this.onBack});

  @override
  State<AdminOrdersScreen> createState() => _AdminOrdersScreenState();
}

class _AdminOrdersScreenState extends State<AdminOrdersScreen> {
  bool _errored = false;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) => _load());
  }

  Future<void> _load() async {
    try {
      await context.read<OrderProvider>().loadAllOrders();
      if (mounted) setState(() => _errored = false);
    } catch (e) {
      dev.log('Admin load error: $e');
      if (mounted) setState(() => _errored = true);
    }
  }

  Future<void> _refresh() async {
    setState(() => _errored = false);
    await _load();
  }

  @override
  Widget build(BuildContext context) {
    final op = context.watch<OrderProvider>();
    return Column(
      children: [
        PageHeader(title: 'Admin — All Orders', onBack: widget.onBack),
        Expanded(
          child: op.adminLoading
              ? const Center(child: CircularProgressIndicator())
              : _errored
                  ? Center(
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          const Text('\u26A0\uFE0F', style: TextStyle(fontSize: 48)),
                          const SizedBox(height: 12),
                          const Text('Failed to load orders',
                              style: TextStyle(fontWeight: FontWeight.w600, color: danger)),
                          const SizedBox(height: 4),
                          const Text('Make sure the admin is added to the admins table',
                              style: TextStyle(fontSize: 13, color: txt3)),
                          const SizedBox(height: 16),
                          OutlinedButton.icon(
                            onPressed: _refresh,
                            icon: const Icon(Icons.refresh, size: 18),
                            label: const Text('Retry'),
                          ),
                        ],
                      ),
                    )
                  : op.adminOrders.isEmpty
                      ? Center(
                          child: Padding(
                            padding: const EdgeInsets.symmetric(horizontal: 24),
                            child: Column(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                const Text('\u{1F4CB}', style: TextStyle(fontSize: 52)),
                                const SizedBox(height: 12),
                                const Text('No orders yet',
                                    style: TextStyle(fontWeight: FontWeight.w600, color: txt3)),
                                const SizedBox(height: 4),
                                const Text('Orders will appear here once customers place them',
                                    style: TextStyle(fontSize: 13, color: txt3)),
                                if (!isAdmin) ...[
                                  const SizedBox(height: 16),
                                  Container(
                                    padding: const EdgeInsets.all(12),
                                    decoration: BoxDecoration(
                                      color: amberBg,
                                      borderRadius: BorderRadius.circular(10),
                                    ),
                                    child: const Text(
                                      'Logged in as a regular user. Sign in with admin@freshgo.com to view all orders.',
                                      style: TextStyle(fontSize: 12, color: txt2),
                                      textAlign: TextAlign.center,
                                    ),
                                  ),
                                ],
                              ],
                            ),
                          ),
                        )
                      : RefreshIndicator(
                          onRefresh: _refresh,
                          child: ListView.builder(
                            padding: const EdgeInsets.fromLTRB(16, 8, 16, 80),
                            itemCount: op.adminOrders.length,
                            itemBuilder: (_, i) => _AdminOrderCard(order: op.adminOrders[i]),
                          ),
                        ),
        ),
      ],
    );
  }
}

class _AdminOrderCard extends StatelessWidget {
  final Order order;
  const _AdminOrderCard({required this.order});

  @override
  Widget build(BuildContext context) {
    final isPending = order.status == 'pending' || order.status == 'transit';
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(rad),
        border: Border.all(color: isPending ? amber.withValues(alpha: 0.4) : const Color(0xFFE8E4DF), width: isPending ? 1.5 : 0.5),
        boxShadow: [
          BoxShadow(color: Colors.black.withValues(alpha: 0.04), blurRadius: 6, offset: const Offset(0, 2)),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text('#${order.id}', style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w800)),
              _StatusBadge(status: order.status),
            ],
          ),
          const SizedBox(height: 6),
          Text(order.date, style: const TextStyle(fontSize: 12, color: txt3)),
          const SizedBox(height: 2),
          Text('User: ${order.userId.length > 8 ? '${order.userId.substring(0, 8)}...' : order.userId}',
              style: const TextStyle(fontSize: 11, color: txt3)),
          const SizedBox(height: 8),
          Row(
            children: [
              Text(order.items.join(' '), style: const TextStyle(fontSize: 18)),
              const Spacer(),
              Text('${order.count} items', style: const TextStyle(fontSize: 12, color: txt3)),
              const SizedBox(width: 8),
              Text(fmt(order.total), style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w800, color: green)),
            ],
          ),
          if (isPending) ...[
            const SizedBox(height: 10),
            SizedBox(
              width: double.infinity,
              child: OutlinedButton.icon(
                onPressed: () async {
                  final ok = await showDialog<bool>(
                    context: context,
                    builder: (ctx) => AlertDialog(
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                      title: const Text('Mark as Delivered'),
                      content: Text('Mark order #${order.id} as delivered?'),
                      actions: [
                        TextButton(onPressed: () => Navigator.pop(ctx, false), child: const Text('Cancel')),
                        TextButton(
                          onPressed: () => Navigator.pop(ctx, true),
                          style: TextButton.styleFrom(foregroundColor: green),
                          child: const Text('Confirm'),
                        ),
                      ],
                    ),
                  );
                  if (ok == true && context.mounted) {
                    context.read<OrderProvider>().updateStatus(order.dbId, 'delivered');
                  }
                },
                icon: const Icon(Icons.check_circle_outline, size: 18),
                label: const Text('Mark Delivered'),
                style: OutlinedButton.styleFrom(
                  foregroundColor: green,
                  side: const BorderSide(color: green, width: 1.5),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                  padding: const EdgeInsets.symmetric(vertical: 10),
                ),
              ),
            ),
          ],
        ],
      ),
    );
  }
}

class _StatusBadge extends StatelessWidget {
  final String status;
  const _StatusBadge({required this.status});

  @override
  Widget build(BuildContext context) {
    Color bg;
    Color fg;
    String label;
    switch (status) {
      case 'pending':
        bg = const Color(0xFFFFF3E0);
        fg = const Color(0xFFE65100);
        label = 'Pending';
        break;
      case 'transit':
        bg = const Color(0xFFE3F2FD);
        fg = info;
        label = 'In Transit';
        break;
      case 'delivered':
        bg = green3;
        fg = green;
        label = 'Delivered';
        break;
      default:
        bg = const Color(0xFFF5F5F5);
        fg = txt3;
        label = status;
    }
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(color: bg, borderRadius: BorderRadius.circular(20)),
      child: Text(label, style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: fg)),
    );
  }
}
