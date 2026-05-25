import 'package:flutter/material.dart';
import '../widgets/ui.dart';

void showContactSheet(BuildContext context) {
  showModalBottomSheet(
    context: context,
    shape: const RoundedRectangleBorder(
      borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
    ),
    builder: (_) => const _ContactSheet(),
  );
}

class _ContactSheet extends StatelessWidget {
  const _ContactSheet();

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(24, 20, 24, 32),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(width: 40, height: 4, decoration: BoxDecoration(color: border, borderRadius: BorderRadius.circular(2))),
          const SizedBox(height: 20),
          const Text('Contact Support', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800)),
          const SizedBox(height: 6),
          const Text('We\'re here to help!', style: TextStyle(fontSize: 13, color: txt3)),
          const SizedBox(height: 24),
          _contactRow(Icons.phone_outlined, 'Call', '+256 700 123 456', () {}),
          const SizedBox(height: 12),
          _contactRow(Icons.email_outlined, 'Email', 'support@freshgo.ug', () {}),
          const SizedBox(height: 12),
          _contactRow(Icons.chat_outlined, 'WhatsApp', 'Tap to chat', () {}),
          const SizedBox(height: 20),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              onPressed: () => Navigator.pop(context),
              style: ElevatedButton.styleFrom(
                backgroundColor: green,
                foregroundColor: Colors.white,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                padding: const EdgeInsets.symmetric(vertical: 14),
              ),
              child: const Text('Close', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700)),
            ),
          ),
        ],
      ),
    );
  }

  Widget _contactRow(IconData icon, String label, String value, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(
          color: const Color(0xFFF8F6F4),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: const Color(0xFFE8E2DC)),
        ),
        child: Row(
          children: [
            Icon(icon, size: 22, color: green),
            const SizedBox(width: 14),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(label, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w700)),
                const SizedBox(height: 2),
                Text(value, style: const TextStyle(fontSize: 12, color: txt3)),
              ],
            ),
            const Spacer(),
            const Icon(Icons.chevron_right, size: 18, color: txt3),
          ],
        ),
      ),
    );
  }
}

void showComingSoon(BuildContext context, String feature) {
  showDialog(
    context: context,
    builder: (ctx) => AlertDialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      title: Row(
        children: [
          const Text('\u{1F6A7}', style: TextStyle(fontSize: 24)),
          const SizedBox(width: 8),
          const Expanded(child: Text('Coming Soon', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800))),
        ],
      ),
      content: Text('$feature will be available in the next update.',
          style: const TextStyle(fontSize: 14, color: txt3)),
      actions: [
        TextButton(
          onPressed: () => Navigator.pop(ctx),
          child: const Text('OK', style: TextStyle(fontWeight: FontWeight.w700)),
        ),
      ],
    ),
  );
}
