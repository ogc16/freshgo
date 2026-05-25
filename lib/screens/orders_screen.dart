import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../i18n/strings.dart';
import '../providers/locale_provider.dart';
import '../providers/order_provider.dart';
import '../utils/formatters.dart';
import '../widgets/contact_sheet.dart';
import '../widgets/ui.dart';

class OrdersScreen extends StatelessWidget {
  final ValueChanged<String> onNavigate;
  final VoidCallback onViewTracking;
  const OrdersScreen({super.key, required this.onNavigate, required this.onViewTracking});

  @override
  Widget build(BuildContext context) {
    final locale = context.watch<LocaleProvider>().locale;
    final orders = context.watch<OrderProvider>().orders;
    return Column(
      children: [
        PageHeader(title: tr('orders.title', locale), onBack: () => onNavigate('home')),
        Expanded(
          child: orders.isEmpty
              ? Center(
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      const Text('\u{1F4E6}', style: TextStyle(fontSize: 52)),
                      const SizedBox(height: 12),
                      const Text('No orders yet',
                          style: TextStyle(fontSize: 14, color: txt3)),
                      const SizedBox(height: 8),
                      const Text('Your orders will appear here once you place one.',
                          style: TextStyle(fontSize: 12, color: txt3)),
                      const SizedBox(height: 24),
                      GestureDetector(
                        onTap: () => showContactSheet(context),
                        child: Container(
                          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                          decoration: BoxDecoration(
                            color: green3,
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: const Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Icon(Icons.chat_outlined, size: 16, color: green),
                              SizedBox(width: 8),
                              Text('Contact Support', style: TextStyle(fontSize: 13, color: green, fontWeight: FontWeight.w700)),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                )
              : ListView(
                  padding: const EdgeInsets.fromLTRB(16, 16, 16, 72),
                  children: [
                    ...orders.map((order) {
                    final isTransit = order.status == 'transit';
                    return GestureDetector(
                      onTap: isTransit ? onViewTracking : null,
                      child: Container(
                        margin: const EdgeInsets.only(bottom: 12),
                        padding: const EdgeInsets.all(14),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(rad),
                          border: Border.all(color: const Color(0xFFE8E4DF), width: 0.5),
                        ),
                        child: Column(
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text('Order #${order.id}',
                                        style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w700)),
                                    const SizedBox(height: 2),
                                    Text(order.date,
                                        style: const TextStyle(fontSize: 11, color: txt3)),
                                  ],
                                ),
                                Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                                  decoration: BoxDecoration(
                                    color: isTransit ? const Color(0xFFFFF3D6) : green3,
                                    borderRadius: BorderRadius.circular(20),
                                  ),
                                  child: Text(
                                    isTransit
                                        ? tr('orders.inTransit', locale)
                                        : tr('orders.delivered', locale),
                                    style: TextStyle(
                                        fontSize: 11,
                                        fontWeight: FontWeight.w700,
                                        color: isTransit ? const Color(0xFF9A6800) : green),
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 10),
                            Row(
                              children: [
                                ...order.items.take(3).map((emoji) => Container(
                                      width: 38,
                                      height: 38,
                                      margin: const EdgeInsets.only(right: 8),
                                      decoration:
                                          BoxDecoration(color: bg, borderRadius: BorderRadius.circular(8)),
                                      child:
                                          Center(child: Text(emoji, style: const TextStyle(fontSize: 20))),
                                    )),
                                if (order.count > 3)
                                  Container(
                                    width: 38,
                                    height: 38,
                                    decoration:
                                        BoxDecoration(color: green3, borderRadius: BorderRadius.circular(8)),
                                    child: Center(
                                      child: Text('+${order.count - 3}',
                                          style: const TextStyle(
                                              fontSize: 11, fontWeight: FontWeight.w700, color: green)),
                                    ),
                                  ),
                              ],
                            ),
                            const SizedBox(height: 10),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text('${order.count} ${tr('home.items', locale)}',
                                    style: const TextStyle(fontSize: 13, color: txt2)),
                                Text(fmt(order.total),
                                    style: const TextStyle(
                                        fontSize: 14, fontWeight: FontWeight.w800, color: green)),
                              ],
                            ),
                            if (isTransit) ...[
                              const SizedBox(height: 10),
                              Container(
                                padding: const EdgeInsets.only(top: 10),
                                decoration: const BoxDecoration(
                                  border: Border(
                                      top: BorderSide(color: Color(0xFFF0ECE6), width: 0.5)),
                                ),
                                child: Row(
                                  children: [
                                    Container(
                                      width: 8,
                                      height: 8,
                                      decoration: const BoxDecoration(
                                        shape: BoxShape.circle,
                                        color: amber,
                                      ),
                                    ),
                                    const SizedBox(width: 6),
                                    Text(tr('orders.liveTracking', locale),
                                        style: const TextStyle(
                                            fontSize: 12, color: amber, fontWeight: FontWeight.w700)),
                                  ],
                                ),
                              ),
                            ],
                          ],
                        ),
                      ),
                    );
                  }),
                    Padding(
                      padding: const EdgeInsets.only(top: 8, bottom: 16),
                      child: GestureDetector(
                        onTap: () => showContactSheet(context),
                        child: Container(
                          padding: const EdgeInsets.all(14),
                          decoration: BoxDecoration(
                            color: green3,
                            borderRadius: BorderRadius.circular(rad),
                            border: Border.all(color: green.withValues(alpha: 0.3)),
                          ),
                          child: const Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Icon(Icons.chat_outlined, size: 18, color: green),
                              SizedBox(width: 8),
                              Text('Need help? Contact Support',
                                  style: TextStyle(fontSize: 13, color: green, fontWeight: FontWeight.w700)),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
        ),
        BottomNav(active: 'orders', onNavigate: onNavigate),
      ],
    );
  }
}
