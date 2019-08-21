import { animated } from 'react-spring';
import { Box, Flex, Text, Heading, Button } from 'system';

const AnimatedBox = animated(Box);
const AnimatedFlex = animated(Flex);
const AnimatedText = animated(Text);
const AnimatedHeading = animated(Heading);
const AnimatedButton = animated(Button);

export {
  AnimatedBox as Box,
  AnimatedFlex as Flex,
  AnimatedText as Text,
  AnimatedHeading as Heading,
  AnimatedButton as Button,
};
