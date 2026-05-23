import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../i18n/strings.dart';
import '../providers/locale_provider.dart';
import '../widgets/language_picker.dart';
import '../widgets/ui.dart';

class LoginScreen extends StatefulWidget {
  final ValueChanged<String> onLogin;
  final VoidCallback onSignUp;
  const LoginScreen({super.key, required this.onLogin, this.onSignUp});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _rememberMe = false;
  bool _obscurePassword = true;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final locale = context.watch<LocaleProvider>().locale;
    return SingleChildScrollView(
      child: Column(
        children: [
          Container(
            padding: const EdgeInsets.only(top: 60, bottom: 40, left: 24, right: 24),
            decoration: const BoxDecoration(color: green),
            child: Stack(
              children: [
                Positioned(top: -40, right: -40, child: Container(width: 160, height: 160, decoration: const BoxDecoration(shape: BoxShape.circle, color: Color(0x0FFFFFFF)))),
                Positioned(bottom: -30, left: -30, child: Container(width: 120, height: 120, decoration: const BoxDecoration(shape: BoxShape.circle, color: Color(0x26F5A100)))),
                Column(
                  children: [
                    const Text('\u{1F37D}\u{FE0F}', style: TextStyle(fontSize: 64)),
                    const SizedBox(height: 14),
                    const Text('FoodApp', style: TextStyle(color: Colors.white, fontSize: 30, fontWeight: FontWeight.w800)),
                    const SizedBox(height: 8),
                    Text(
                      tr('login.tagline', locale),
                      textAlign: TextAlign.center,
                      style: TextStyle(color: Colors.white.withValues(alpha: 0.75), fontSize: 14, height: 1.5),
                    ),
                  ],
                ),
              ],
            ),
          ),
          Container(
            padding: const EdgeInsets.fromLTRB(24, 28, 24, 32),
            decoration: const BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(tr('login.email', locale).toUpperCase(), style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: txt2, letterSpacing: 0.5)),
                const SizedBox(height: 6),
                FormInput(
                  hintText: tr('login.emailHint', locale),
                  keyboardType: TextInputType.emailAddress,
                  controller: _emailController,
                ),
                const SizedBox(height: 16),
                Text(tr('login.password', locale).toUpperCase(), style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: txt2, letterSpacing: 0.5)),
                const SizedBox(height: 6),
                Container(
                  child: Row(
                    children: [
                      Expanded(
                        child: TextField(
                          controller: _passwordController,
                          obscureText: _obscurePassword,
                          decoration: InputDecoration(
                            hintText: tr('login.passwordHint', locale),
                            hintStyle: const TextStyle(color: txt3, fontSize: 14),
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(radButton),
                              borderSide: const BorderSide(color: border),
                            ),
                            enabledBorder: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(radButton),
                              borderSide: const BorderSide(color: border),
                            ),
                            focusedBorder: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(radButton),
                              borderSide: const BorderSide(color: green, width: 1.5),
                            ),
                            contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                            isDense: true,
                            filled: true,
                            fillColor: Colors.white,
                          ),
                          style: const TextStyle(fontSize: 15, color: txt),
                        ),
                      ),
                      const SizedBox(width: 8),
                      GestureDetector(
                        onTap: () => setState(() => _obscurePassword = !_obscurePassword),
                        child: Container(
                          width: 44, height: 44,
                          decoration: BoxDecoration(
                            color: green3,
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Center(
                            child: Icon(
                              _obscurePassword ? Icons.visibility_off_outlined : Icons.visibility_outlined,
                              color: green, size: 20,
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 12),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    GestureDetector(
                      onTap: () => setState(() => _rememberMe = !_rememberMe),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Container(
                            width: 20, height: 20,
                            decoration: BoxDecoration(
                              color: _rememberMe ? green : Colors.white,
                              borderRadius: BorderRadius.circular(4),
                              border: Border.all(color: _rememberMe ? green : border, width: 1.5),
                            ),
                            child: _rememberMe
                                ? const Icon(Icons.check, size: 14, color: Colors.white)
                                : null,
                          ),
                          const SizedBox(width: 8),
                          Text(tr('login.rememberMe', locale), style: const TextStyle(fontSize: 13, color: txt2)),
                        ],
                      ),
                    ),
                    GestureDetector(
                      onTap: () {},
                      child: Text(tr('login.forgotPassword', locale), style: const TextStyle(fontSize: 13, color: green, fontWeight: FontWeight.w600)),
                    ),
                  ],
                ),
                const SizedBox(height: 20),
                PrimaryButton(text: tr('login.signIn', locale), onPressed: () => widget.onLogin(_emailController.text)),
                const SizedBox(height: 16),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text('${tr('login.noAccount', locale)} ', style: const TextStyle(fontSize: 14, color: txt2)),
                    GestureDetector(
                      onTap: widget.onSignUp,
                      child: Text(tr('login.signUp', locale), style: const TextStyle(fontSize: 14, color: green, fontWeight: FontWeight.w700)),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
