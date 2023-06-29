import { View } from 'react-native';
//@ts-ignore
import Avatar from '../../../../assets/debateZone/avatar.svg';
import { Device } from 'mediasoup-client';
import { useEffect } from 'react';

interface MediaComponentProps {}

export const MediaComponent = (props: MediaComponentProps) => {
    useEffect(() => {
        const mediasoupClientDevice = new Device();

        if (!mediasoupClientDevice.canProduce('video')) {
            console.log('cannot produce video');
        } else {
            console.log('can produce video');
        }

        if (!mediasoupClientDevice.canProduce('audio')) {
            console.log('cannot produce audio');
        } else {
            console.log('can produce audio');
        }

        mediasoupClientDevice.observer.on('newtransport', transport => {
            console.log(
                'new transport created [transport.id:%s]',
                transport.id,
            );

            transport.observer.on('close', () => {
                console.log('transport closed [transport.id:%s]', transport.id);
            });

            transport.observer.on('newproducer', producer => {
                console.log(
                    'new producer created [transport.id:%s, producer.id:%s]',
                    transport.id,
                    producer.id,
                );

                producer.observer.on('close', () => {
                    console.log(
                        'producer closed [producer.id:%s]',
                        producer.id,
                    );
                });
            });

            transport.observer.on('newconsumer', consumer => {
                console.log(
                    'new consumer created [transport.id:%s, consumer.id:%s]',
                    transport.id,
                    consumer.id,
                );

                consumer.observer.on('close', () => {
                    console.log(
                        'consumer closed [consumer.id:%s]',
                        consumer.id,
                    );
                });
            });

            transport.observer.on('newdataproducer', dataProducer => {
                console.log(
                    'new data producer created [transport.id:%s, dataProducer.id:%s]',
                    transport.id,
                    dataProducer.id,
                );

                dataProducer.observer.on('close', () => {
                    console.log(
                        'data producer closed [dataProducer.id:%s]',
                        dataProducer.id,
                    );
                });
            });

            transport.observer.on('newdataconsumer', dataConsumer => {
                console.log(
                    'new data consumer created [transport.id:%s, dataConsumer.id:%s]',
                    transport.id,
                    dataConsumer.id,
                );

                dataConsumer.observer.on('close', () => {
                    console.log(
                        'data consumer closed [dataConsumer.id:%s]',
                        dataConsumer.id,
                    );
                });
            });
        });
    }, []);

    return (
        <View
            style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        ></View>
    );
};
