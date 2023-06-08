import { supabase } from '../lib';
import { Action } from '../types';

export const getActions = async (): Promise<Action[]> => {
  try {
    const result = await supabase.from('actions').select('*');
    const data = result.data as Action[];
    if (data && data.length) {
      return data;
    }
    return [];
  } catch {
    return [];
  }
};

export const getSelectedActions = async (code: string): Promise<Action[]> => {
  try {
    const { data } = await supabase.from('games').select('actions').eq('code', code);
    if (data && data[0].actions.length) {
      return data[0].actions;
    }
    return [];
  } catch {
    return [];
  }
};

export const addAction = async (newAction: Action, code: string, fromList: boolean) => {
  try {
    if (!fromList) {
      await supabase.from('actions').insert(newAction);
    }

    const { data } = await supabase.from('games').select('actions').eq('code', code);
    if (data && data[0].actions) {
      return await supabase
        .from('games')
        .update({ actions: [...data[0].actions, newAction] })
        .eq('code', code);
    }
    return await supabase
      .from('games')
      .update({ actions: [newAction] })
      .eq('code', code);
  } catch (e) {
    return;
  }
};

export const removeSelectedAction = async (action: Action, code: string) => {
  try {
    const { data } = await supabase.from('games').select('actions').eq('code', code);
    if (data && data[0].actions) {
      const filteredSelectedActions = data[0].actions.filter(
        (selectedAction: Action) => selectedAction.id !== action.id,
      );
      return await supabase
        .from('games')
        .update({ actions: [...filteredSelectedActions] })
        .eq('code', code);
    }
  } catch (e) {
    return;
  }
};
