import 'package:flutter/material.dart';

class BouttonWidget extends StatelessWidget {
  final String text;
  final VoidCallback onPressed;

  const BouttonWidget({
    super.key,
    required this.text,
    required this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    final Size size = MediaQuery.of(context).size;

    return MaterialButton(
      onPressed: onPressed,
      minWidth: double.infinity,
      height: size.height / 15,
      color: Theme.of(context).colorScheme.secondary,
      shape: RoundedRectangleBorder(
        side: BorderSide(
          color: Theme.of(context).colorScheme.tertiary,
        ),
        borderRadius: BorderRadius.circular(50),
      ),
      child: Text(
        text,
        style: const TextStyle(
          fontWeight: FontWeight.bold,
          fontSize: 20,
          color: Colors.black,
        ),
      ),
    );
  }
}

// Widget BouttonWidget({
//   height,
//   color,
//   shapeColor,
//   text,
//   onPressed,
// }) {
//   return MaterialButton(
//     onPressed: onPressed,
//     minWidth: double.infinity,
//     height: height,
//     color: color,
//     shape: RoundedRectangleBorder(
//       side: BorderSide(
//         color: shapeColor,
//       ),
//       borderRadius: BorderRadius.circular(50),
//     ),
//     child: Text(
//       text,
//       style: const TextStyle(
//         fontWeight: FontWeight.bold,
//         fontSize: 20,
//         color: Colors.black,
//       ),
//     ),
//   );
// }
