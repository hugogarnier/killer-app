import React from 'react';
import { View } from 'react-native';

import { Button, Input, KeyboardLayout } from '../../../src/ui';

export default function CreateJoin() {
  return (
    <KeyboardLayout>
      <View>
        <Input
          value={'title'}
          onChangeText={(text) => console.log(text)}
          title={'titre de la partie'}
        />
        <View className="pt-4">
          <Button text={'créer'} variant={'primary'} onPress={() => null} />
        </View>
      </View>

      <View>
        <Input
          autoCapitalize={'characters'}
          value={'code'}
          onChangeText={(text) => console.log(text)}
          title={'code de la partie'}
        />
        <View className="pt-4">
          <Button text={'rejoindre'} variant={'secondary'} onPress={() => null} />
        </View>
      </View>
    </KeyboardLayout>
  );
}
