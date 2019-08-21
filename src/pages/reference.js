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

// motion elements
import {
  Heading as MotionHeading,
  Button as MotionButton,
} from 'system/motion';

// spring elements
import {
  Heading as AnimatedHeading,
  Button as AnimatedButton,
} from 'system/animated';

import { useSpring } from 'react-spring';
import { withGlobal } from 'components/Layout';

function Break({ children }) {
  return (
    <>
      <Heading as={`h4`} variant={`subtitle`}>
        {children}
      </Heading>
      <Box
        as={`figure`}
        width={1}
        height={`1px`}
        sx={{
          willChange: `background-color`,
          transition: `background-color 0.2s ease-out`,
          bg: `text`,
          mb: [`5px`, `10px`, `20px`],
        }}
      />
    </>
  );
}

function Index({ useVideo }) {
  const currentVideo = useVideo(state => state.currentVideo);
  console.log('currentVideo', currentVideo);
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
            />
          </Button>
        </Container>
      </Section>
      <Section
        as={`header`}
        sx={{
          bg: `faded`,
          borderBottom: `1px solid`,
          borderColor: `divider`,
          willChange: `border-color`,
          transition: `border-color 0.2s ease-out`,
        }}
      >
        <Container>
          <Heading as={`h1`} variant={`title`}>
            Style Guide
          </Heading>
        </Container>
      </Section>
      <Section>
        <Container>
          <Break sxProps={{ mt: 0 }}>{`Headings`}</Break>
          <Row>
            <Column width={[`100%`, `100%`, 1 / 2, 1 / 3]}>
              {headings.map((h, idx) => (
                <Heading
                  key={`staticheading-${idx}`}
                  as={h}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + idx * 0.1 }}
                >
                  {`Static ${h.toUpperCase()}`}
                </Heading>
              ))}
            </Column>
            <Column width={[`100%`, `100%`, 1 / 2, 1 / 3]}>
              {headings.map((h, idx) => (
                <MotionHeading
                  key={`motionheading-${idx}`}
                  as={h}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + idx * 0.1 }}
                >
                  {`Motion ${h.toUpperCase()}`}
                </MotionHeading>
              ))}
            </Column>
            <Column width={[`100%`, `100%`, 1 / 2, 1 / 3]}>
              {headings.map((h, idx) => (
                <AnimatedHeading
                  key={`springheading-${idx}`}
                  as={h}
                  style={springs[idx]}
                >
                  {`Spring ${h.toUpperCase()}`}
                </AnimatedHeading>
              ))}
            </Column>
          </Row>
        </Container>
      </Section>
      <Section>
        <Container>
          <Break>{`Buttons`}</Break>
          <Row>
            <Column width={[`100%`, `100%`, 1 / 2, 1 / 3]}>
              <Button>Static</Button>
            </Column>
            <Column width={[`100%`, `100%`, 1 / 2, 1 / 3]}>
              <MotionButton
                variants={{
                  idle: {
                    rotate: `0deg`,
                  },
                  active: {
                    rotate: `180deg`,
                  },
                }}
                initial={`idle`}
                animate={motionButtonState}
                onClick={() => {
                  setMotionButtonState(
                    motionButtonState === `idle` ? `active` : `idle`
                  );
                }}
              >
                Motion
              </MotionButton>
            </Column>
            <Column width={[`100%`, `100%`, 1 / 2, 1 / 3]}>
              <AnimatedButton
                style={{ willChange: `transform`, ...buttonSpring }}
                onClick={() => {
                  setSpringButtonState(
                    springButtonState === `idle` ? `active` : `idle`
                  );
                }}
              >
                Spring
              </AnimatedButton>
            </Column>
          </Row>
        </Container>
      </Section>
    </>
  );
}

export default withTheme(withGlobal(Index));
