import 'package:flutter/foundation.dart';
import '../models/product.dart';
import 'product_provider.dart';

class CartProvider extends ChangeNotifier {
  final Map<int, int> _cart = {};
  Map<int, Product>? _productCache;
  bool _cartOpen = false;

  List<MapEntry<Product, int>>? _cachedCartItems;
  int? _cachedCartTotal;
  int? _cachedItemCount;

  Map<int, int> get cart => _cart;
  bool get cartOpen => _cartOpen;

  void cacheFromProvider(ProductProvider p) {
    if (_productCache != null) return;
    if (p.allProducts.isEmpty) return;
    _productCache = {for (final prod in p.allProducts) prod.id: prod};
  }

  void _invalidate() {
    _cachedCartItems = null;
    _cachedCartTotal = null;
    _cachedItemCount = null;
  }

  Product? _product(int id) => _productCache?[id];

  void addItem(int id) {
    _cart[id] = (_cart[id] ?? 0) + 1;
    _invalidate();
    notifyListeners();
  }

  void removeItem(int id) {
    if (_cart.containsKey(id)) {
      if (_cart[id]! > 1) {
        _cart[id] = _cart[id]! - 1;
      } else {
        _cart.remove(id);
      }
      _invalidate();
      notifyListeners();
    }
  }

  void clearCart() {
    _cart.clear();
    _invalidate();
    notifyListeners();
  }

  void toggleCart() {
    _cartOpen = !_cartOpen;
    notifyListeners();
  }

  void openCart() {
    _cartOpen = true;
    notifyListeners();
  }

  void closeCart() {
    _cartOpen = false;
    notifyListeners();
  }

  int get itemCount {
    if (_cachedItemCount != null) return _cachedItemCount!;
    int count = 0;
    for (final qty in _cart.values) {
      count += qty;
    }
    _cachedItemCount = count;
    return count;
  }

  int get cartTotal {
    if (_cachedCartTotal != null) return _cachedCartTotal!;
    int total = 0;
    _cart.forEach((id, qty) {
      final p = _product(id);
      if (p != null) total += p.price * qty;
    });
    _cachedCartTotal = total;
    return total;
  }

  List<MapEntry<Product, int>> get cartItems {
    if (_cachedCartItems != null) return _cachedCartItems!;
    _cachedCartItems = _cart.entries.map((e) {
      final p = _product(e.key)!;
      return MapEntry(p, e.value);
    }).toList();
    return _cachedCartItems!;
  }
}
