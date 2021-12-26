import React, { useState, Suspense } from 'react';
import { ARCanvas, Interactive } from '@react-three/xr';
import { Text, Circle, Image } from '@react-three/drei';

function Box({ color, size, scale, children, ...rest }) {
  return (
    <mesh scale={scale} {...rest}>
      <boxBufferGeometry attach='geometry' args={size} />
      <meshPhongMaterial attach='material' color={color} />
      {children}
    </mesh>
  );
}

function Button(props) {
  const [hover, setHover] = useState(false);
  const [color, setColor] = useState('blue');

  const onSelect = () => {
    setColor((Math.random() * 0xffffff) | 0);
  };

  return (
    <Interactive onHover={() => setHover(true)} onBlur={() => setHover(false)} onSelect={onSelect}>
      <Box
        color={color}
        scale={hover ? [0.6, 0.6, 0.6] : [0.5, 0.5, 0.5]}
        size={[0.8, 0.1, 0.1]}
        {...props}
      >
        <Text
          position={[0, 0, 0.06]}
          fontSize={0.05}
          color='#000'
          anchorX='center'
          anchorY='middle'
        >
          {props.title}
        </Text>
      </Box>
    </Interactive>
  );
}

export default function App() {
  return (
    <ARCanvas>
      <Circle scale={[0.1, 0.1, 0.2]} position={[0, 0.3, -0.6]} />
      <Suspense fallback={null}>
        <Image url='https://avatars.githubusercontent.com/u/37216970?v=4' />
      </Suspense>
      <pointLight position={[10, 10, 10]} />
      <Button position={[0, 0.1, -0.6]} title={'My Facebook'} />
      <Button position={[0, 0, -0.6]} title={'My Github'} />
      <Button position={[0, -0.1, -0.6]} title={'My Linkedin'} />
    </ARCanvas>
  );
}
