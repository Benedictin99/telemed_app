import 'package:flutter/material.dart';

class InputTextWidget extends StatelessWidget {
  final TextEditingController controller;
  final String labelText;
  final String hintText;
  final TextInputType keyboardType;
  final bool obscureText;
  final String? Function(String?)? validator;
  final FocusNode? focusNode;

  final dynamic prefixIcon;
  final dynamic suffixIcon;

  final dynamic errorText;

  const InputTextWidget({
    super.key,
    required this.controller,
    required this.labelText,
    required this.hintText,
    required this.keyboardType,
    required this.errorText,
    this.obscureText = false,
    this.validator,
    this.focusNode,
    this.prefixIcon,
    this.suffixIcon,
  });

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: controller,
      keyboardType: keyboardType,
      obscureText: obscureText,
      focusNode: focusNode,
      decoration: InputDecoration(
        labelText: labelText,
        floatingLabelStyle:
            TextStyle(color: Theme.of(context).colorScheme.outline),
        hintText: hintText,
        hintStyle: TextStyle(color: Theme.of(context).colorScheme.primary),
        errorText: errorText,
        prefixIcon: Icon(
          prefixIcon,
          color: Theme.of(context).colorScheme.primary,
        ),
        suffixIcon: suffixIcon,
        border: const OutlineInputBorder(),
        enabledBorder: OutlineInputBorder(
          borderSide: BorderSide(
            color: Theme.of(context).colorScheme.primary,
          ),
        ),
        focusedBorder: OutlineInputBorder(
          borderSide: BorderSide(
            color: Theme.of(context).colorScheme.outline,
            width: 1.5,
          ),
        ),
      ),
      validator: validator,
      onEditingComplete: () => validator,
    );
  }
}
