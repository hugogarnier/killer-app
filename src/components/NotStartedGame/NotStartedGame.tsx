import React, { FC, useCallback, useMemo, useRef } from 'react';
import { Pressable, Text, View } from 'react-native';

import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';

import { colors } from '../../constants';
import { usePostJoinGame, usePostStartGame } from '../../services';
import { useAuthStore } from '../../stores';
import { Game, Player } from '../../types';
import { Button, Card, Layout, TextCard } from '../../ui';
import { Share } from '../../ui/Icons';
import { shareCode } from '../../utils';

type NotStartedGameProps = {
  game: Game;
  players: Player[];
};

export const NotStartedGame: FC<NotStartedGameProps> = ({ game, players }) => {
  const { user } = useAuthStore();
  const { mutate: mutatePostStartGame } = usePostStartGame();
  const { mutate: mutatePostJoinGame } = usePostJoinGame();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['75%'], []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const isAdmin = game.admin === user.id;
  const isAdminPlaying = players.find((player) => player.player_id === user.id);

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
      { user: user, code: game.code },
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

  return (
    <>
      <Layout>
        <View className="flex-1 justify-between pb-16">
          <View className="flex-row justify-center items-center space-x-4">
            <Text className="text-xl font-bold">{game.code}</Text>
            <Pressable
              className="bg-gray200 p-2 rounded-full active:bg-gray400"
              onPress={() => shareCode(game.code)}
            >
              <Share color={colors.gray800} />
            </Pressable>
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
      </Layout>
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          enablePanDownToClose
          backdropComponent={renderBackdrop}
          backgroundStyle={{ backgroundColor: colors.gray200 }}
        >
          <View className={'flex-1 items-center px-6 pt-16'}>
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
      </BottomSheetModalProvider>
    </>
  );
};
