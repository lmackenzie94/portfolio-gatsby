import { motion } from 'framer-motion';
import { Box, Flex, Text, Heading, Button } from 'system';

const MotionBox = motion.custom(Box);
const MotionFlex = motion.custom(Flex);
const MotionText = motion.custom(Text);
const MotionHeading = motion.custom(Heading);
const MotionButton = motion.custom(Button);

export {
  MotionBox as Box,
  MotionFlex as Flex,
  MotionText as Text,
  MotionHeading as Heading,
  MotionButton as Button,
};
