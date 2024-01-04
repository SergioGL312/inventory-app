import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

// COMPONENTS
import EntriesHistory from '../Components/EntriesHistory';
import OutputsHistory from '../Components/OutputsHistory';

const EntriesRoute = () => (
  <EntriesHistory />
);

const OutputsRoute = () => (
  <OutputsHistory />
);

const renderScene = SceneMap({
  entradas: EntriesRoute,
  salidas: OutputsRoute,
});

export default function History() {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'entradas', title: 'Entradas' },
    { key: 'salidas', title: 'Salidas' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      tabBarPosition='bottom'
    />
  );
}