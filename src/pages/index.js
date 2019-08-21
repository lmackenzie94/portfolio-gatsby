/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { useState } from 'react';
import { useColorMode } from 'theme-ui';
import { withTheme } from 'emotion-theming';
import { useSprings } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/pro-solid-svg-icons/faCircle';
import { faCircle as faCircleOutline } from '@fortawesome/pro-regular-svg-icons/faCircle';

// static elements
import { Box, Button, Heading, Section, Container, Row, Column } from 'system';

// spring elements
import {
  Heading as AnimatedHeading,
  Button as AnimatedButton,
} from 'system/animated';

import { useSpring } from 'react-spring';
import { withGlobal } from 'components/Layout';

function Index() {
  const [colorMode, setColorMode] = useColorMode();
  const headings = [`h1`, `h2`, `h3`, `h4`, `h5`, `h6`];
  const springs = useSprings(
    headings.length,
    headings.map((item, idx) => ({
      opacity: 1,
      transform: `translate3d(0, 0, 0)`,
      delay: 500 + idx * 0.1 * 1000,
      from: { opacity: 0, transform: `translate3d(0, 5px, 0)` },
    }))
  );

  const [springButtonState, setSpringButtonState] = useState(`idle`);
  const [motionButtonState, setMotionButtonState] = useState(`idle`);
  const buttonSpring = useSpring({
    transform:
      springButtonState === `active`
        ? `rotate(180deg) translate3d(0,0,0)`
        : `rotate(0deg) translate3d(0,0,0)`,
  });

  return (
    <>
      <Section as={`div`} variant={`tiny`}>
        <Container>
          <Button
            variant={`icon`}
            sx={{ position: `absolute`, top: [15, 20], right: 0 }}
            onClick={() =>
              setColorMode(colorMode === `dark` ? `light` : `dark`)
            }
          >
            <FontAwesomeIcon
              icon={colorMode === `light` ? faCircleOutline : faCircle}
              sx={{ color: `secondary1` }}
            />
          </Button>
        </Container>
      </Section>
      <Section
        as={`header`}
        sx={{
          borderBottom: `1px solid`,
          borderColor: `divider`,
          willChange: `border-color`,
          transition: `border-color 0.2s ease-out`,
          minHeight: `100vh`,
          backgroundImage: theme => theme.colors.gradient,
        }}
      >
        <Container
          sx={{
            border: `5px solid`,
            borderColor: 'border',
            height: `100%`,
            textAlign: `center`,
            paddingTop: [3, 4, 5],
          }}
        >
          <Box
            sx={{
              paddingLeft: [`0.6rem`, `0.9rem`],
            }}
          >
            <Heading
              as={`h1`}
              variant={`title`}
              sx={{
                color: 'background',
                display: `inline-block`,
                textShadow: theme => `4px 4px 0 ${theme.colors.secondary3}`,
                letterSpacing: `1rem`,
                marginBottom: 0,
              }}
            >
              LU
            </Heading>
            <Heading
              as={`h1`}
              variant={`title`}
              sx={{
                color: 'primary',
                display: `inline-block`,
                textShadow: theme => `4px 4px 0 ${theme.colors.secondary3}`,
                letterSpacing: `1rem`,
                marginBottom: 0,
              }}
            >
              KE
            </Heading>
          </Box>

          <Heading
            as={`h2`}
            variant={`h3`}
            sx={{
              textAlign: `center`,
              color: 'primary',
              fontWeight: `bold`,
              letterSpacing: `0.4rem`,
              marginTop: `-0.9rem`,
              marginLeft: `0.5rem`,
            }}
          >
            MACKENZIE
          </Heading>
          <Box
            sx={{
              border: `5px solid`,
              borderColor: 'border',
              width: [`90%`, `75%`, `60%`],
              padding: [2],
              my: [5],
            }}
          >
            <Box
              sx={{
                border: `5px solid`,
                borderColor: 'innerBorder',
                padding: [2, 3, 4],
                bg: 'background',
              }}
            >
              <p>Hey, I'm Luke</p>
              <p>I'm a Toronto-based Web Developer</p>
              <p>Thanks for stopping by!</p>
            </Box>
          </Box>
        </Container>
      </Section>
    </>
  );
}
export default withGlobal(Index);
