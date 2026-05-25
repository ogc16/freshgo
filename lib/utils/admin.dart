import 'package:supabase_flutter/supabase_flutter.dart';

const String adminEmail = 'admin@freshgo.com';

bool get isAdmin {
  final user = Supabase.instance.client.auth.currentUser;
  if (user == null) return false;
  return user.email == adminEmail;
}

String? get adminUserId {
  final user = Supabase.instance.client.auth.currentUser;
  if (user == null) return null;
  return isAdmin ? user.id : null;
}
