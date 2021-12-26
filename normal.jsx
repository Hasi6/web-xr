import React, { Suspense, useState } from 'react';
import { DefaultXRControllers, ARCanvas, Interactive } from '@react-three/xr';
import { Text, Circle, Html } from '@react-three/drei';
import './styles.css';

function Box({ color, size, scale, children, ...rest }: any) {
  return (
    <mesh scale={scale} {...rest}>
      <boxBufferGeometry attach='geometry' args={size} />
      <meshPhongMaterial attach='material' color={color} />
      {children}
    </mesh>
  );
}

function Button(props: any) {
  const [hover, setHover]: any = useState(false);
  const [color, setColor]: any = useState('blue');

  const onSelect = () => {
    setColor((Math.random() * 0xffffff) | 0);
    window.location.href = 'https://www.facebook.com';
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

function App() {
  return (
    <ARCanvas>
      <>
        <Circle scale={[0.1, 0.1, 0.2]} position={[0, 0.3, -0.6]} />
        <pointLight position={[10, 10, 10]} />
        <Button position={[0, 0.1, -0.6]} title={'My Facebook'} />
        <Button position={[0, 0, -0.6]} title={'My Github'} />
        <Button position={[0, -0.1, -0.6]} title={'My Linkedin'} />
        <Circle scale={[0.04, 0.04, 0.2]} position={[0, -0.25, -0.6]} />
        <Circle scale={[0.04, 0.04, 0.2]} position={[-0.1, -0.25, -0.6]} />
        <Circle scale={[0.04, 0.04, 0.2]} position={[0.1, -0.25, -0.6]} />
        <DefaultXRControllers />
      </>
    </ARCanvas>
  );
}

export default App;
