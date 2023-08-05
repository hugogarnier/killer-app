import React, { FC, useCallback, useMemo, useRef } from 'react';
import { View } from 'react-native';

import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetSpringConfigs,
} from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { useAuth0 } from 'react-native-auth0';

import { colors, defaultUser } from '../../constants';
import { usePostJoinGame, usePostStartGame } from '../../services';
import { Game, Player } from '../../types';
import { Button, Card, Text, TextCard } from '../../ui';

type NotStartedGameProps = {
  game: Game;
  players: Player[];
};

export const NotStartedGame: FC<NotStartedGameProps> = ({ game, players }) => {
  const { user } = useAuth0();
  const { mutate: mutatePostStartGame } = usePostStartGame();
  const { mutate: mutatePostJoinGame } = usePostJoinGame();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['75%'], []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const userExists = (user && user) || defaultUser;

  const isAdmin = game.admin === userExists.sub;
  const isAdminPlaying = players.find((player) => player.player_id === userExists.sub);

  const renderBackdrop = useCallback(
    (props: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          position: 'absolute',
          top: 0,
          height: '100%',
          width: '150%',
        }}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );

  const handleStartGame = () => {
    mutatePostStartGame(
      { code: game.code },
      {
        onSuccess: () => {
          // toast ??
        },
      },
    );
  };

  const handleJoinGame = () => {
    mutatePostJoinGame(
      { user: userExists, code: game.code },
      {
        onSuccess: () => {
          // toast ??
        },
        onError: () => {
          // toast
        },
      },
    );
  };

  const playerFound = players.find((player) => !!player.code);

  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 500,
  });

  return (
    <>
      <View className="flex-1 justify-between pt-32 pb-16">
        <View className="flex-row justify-center items-center space-x-4">
          <Text className="text-xl font-bold">{game.code}</Text>
        </View>

        <View>
          <View className="mb-4">
            <Card
              variant="secondary"
              title="liste des joueurs"
              subtitle={`${(playerFound && players.length) || 0} joueur(s)`}
              onPress={handlePresentModalPress}
            />
          </View>

          {/* {isAdmin && (
              <Card
                variant="secondary"
                title="liste des actions"
                subtitle={`${players.length}/${players.length}`}
              />
            )} */}
        </View>
        <View className="items-center">
          {!game.started && isAdmin && (
            <Button
              onPress={handleStartGame}
              disabled={!game.actions}
              text={'démarrer la partie'}
            />
          )}
          {!isAdminPlaying && (
            <Button onPress={handleJoinGame} variant={'secondary'} text={'rejoindre la partie'} />
          )}
        </View>
      </View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: colors.gray200 }}
        animationConfigs={animationConfigs}
      >
        <View className={'flex-1 items-center px-6 pt-10'}>
          <Text className="text-xl font-bold pb-4">liste des joueurs</Text>
          {playerFound &&
            players.map((player) => {
              return (
                <View key={player.id} className="flex flex-row px-4 mb-4">
                  <TextCard variant="primary" title={player.player_name} status={player.alive} />
                </View>
              );
            })}
        </View>
      </BottomSheetModal>
    </>
  );
};
