import { StyleSheet, StatusBar, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { ComponentType, useState } from 'react';

interface HomeTabComponentProps {
    live: ComponentType;
    feed: ComponentType;
}

export const HomeTabComponent = ({ live, feed }: HomeTabComponentProps) => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'live', title: 'LIVE' },
        { key: 'feed', title: 'FEED' },
    ]);

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={SceneMap({
                live: live,
                feed: feed,
            })}
            sceneContainerStyle={styles.scene}
            renderTabBar={props => {
                return (
                    <TabBar
                        {...props}
                        indicatorStyle={{
                            backgroundColor: 'transparent',
                        }}
                        labelStyle={{
                            fontSize: 20,
                        }}
                        activeColor={'#D88806'}
                        inactiveColor={'#FFFFFF'}
                        style={{
                            backgroundColor: 'rgba(212,169,226,0)',

                            marginTop: Dimensions.get('window').height * 0.1,
                            position: 'absolute',
                            zIndex: 1,
                            width: Dimensions.get('window').width,
                        }}
                        tabStyle={{ width: 'auto' }}
                        scrollEnabled={true}
                        contentContainerStyle={{
                            zIndex: 1,
                            justifyContent: 'center',
                            flexGrow: 1,
                        }}
                    />
                );
            }}
            onIndexChange={setIndex}
            initialLayout={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height,
            }}
            style={styles.container}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#A9BBE2',
    },
    scene: {
        height: Dimensions.get('window').height,
    },
});
