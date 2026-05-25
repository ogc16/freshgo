import 'dart:convert';
import 'package:flutter/foundation.dart';
import '../models/product.dart';
import '../utils/database_service.dart';
import '../utils/supabase.dart';

class Order {
  final String id;
  final String date;
  final String status;
  final List<String> items;
  final int count;
  final int total;

  const Order({
    required this.id,
    required this.date,
    required this.status,
    required this.items,
    required this.count,
    required this.total,
  });

  Map<String, dynamic> toMap() => {
    'order_id': id,
    'created_at': date,
    'status': status,
    'items': items,
    'count': count,
    'total': total,
  };

  factory Order.fromMap(Map<String, dynamic> map, String id) => Order(
    id: id,
    date: (map['created_at'] as String?)?.split('T').first ?? '',
    status: map['status'] as String? ?? 'delivered',
    items: (map['items'] as List?)?.cast<String>() ?? [],
    count: map['count'] as int? ?? 0,
    total: map['total'] as int? ?? 0,
  );
}

class OrderProvider extends ChangeNotifier {
  final List<Order> _orders = [];

  List<Order> get orders => List.unmodifiable(_orders);

  Future<void> loadFromSupabase() async {
    final user = supabase.auth.currentUser;
    if (user == null) return;
    try {
      final rows = await DatabaseService.getOrders(user.id);
      _orders.clear();
      for (final row in rows) {
        _orders.add(Order.fromMap(row, row['order_id'] as String? ?? ''));
      }
      notifyListeners();
    } catch (_) {}
  }

  void addOrder(String id, List<MapEntry<Product, int>> cartItems, int total) {
    final order = Order(
      id: id,
      date: _today(),
      status: 'transit',
      items: cartItems.map((e) => e.key.emoji).toList(),
      count: cartItems.fold(0, (sum, e) => sum + e.value),
      total: total,
    );
    _orders.insert(0, order);
    notifyListeners();
    _saveToSupabase(order);
  }

  Future<void> _saveToSupabase(Order order) async {
    final user = supabase.auth.currentUser;
    if (user == null) return;
    try {
      await DatabaseService.createOrder({
        'user_id': user.id,
        'order_id': order.id,
        'created_at': DateTime.now().toIso8601String(),
        'status': order.status,
        'items': order.items,
        'count': order.count,
        'total': order.total,
      });
    } catch (_) {}
  }

  static String _today() {
    final n = DateTime.now();
    return '${n.year}-${_pad(n.month)}-${_pad(n.day)}';
  }

  static String _pad(int n) => n.toString().padLeft(2, '0');
}
