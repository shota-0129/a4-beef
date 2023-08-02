import { getBucket } from '@extend-chrome/storage';

enum IsChargeModeStrEnum {
  CHARGEMODE = 'true',
  APIKEYMODE = 'false',
}

type IsChargeModeObjType = {
  mode: IsChargeModeStrEnum;
};

type IsChargeModeFnType = {
  getIsChargeMode: () => Promise<boolean>;
  handleIsChargeMode: (modeBoolean: boolean) => Promise<void>;
};

/**
 * IsChargeModeObjType to boolean
 *
 * @param modeObj IsChargeModeObjType
 *
 * @returns boolean
 */
const isChargeModeTypeObjToBool = (modeObj: IsChargeModeObjType): boolean => {
  return modeObj.mode === 'true';
};

/**
 * boolean to IsChargeModeObjType
 *
 * @param modeBoolean boolean
 *
 * @returns IsChargeModeObjType
 */
const isChargeModeTypeStrToObj = (modeBoolean: boolean): IsChargeModeObjType => {
  return { mode: modeBoolean ? IsChargeModeStrEnum.CHARGEMODE : IsChargeModeStrEnum.APIKEYMODE };
};

/**
 * 課金modeの状態を保持する
 */
const isChargeModeBucket = getBucket<IsChargeModeObjType>('isChargeMode', 'sync');

/**
 * 課金modeの取得・更新
 *
 * @returns getIsChargeMode: 課金modeの取得
 * @returns handleIsChargeMode: 課金modeの更新
 */
export const isChargeModeFn = (): IsChargeModeFnType => {
  /**
   * 課金modeの取得
   *
   * @returns 課金mode true: 従量課金mode false: APIキーmode
   */
  const getIsChargeMode = async () => {
    const nowModeObj = await isChargeModeBucket.get();
    return isChargeModeTypeObjToBool(nowModeObj);
  };

  /**
   * 課金modeの更新
   *
   * @param modeBoolean 課金mode true: 従量課金mode false: APIキーmode
   */
  const handleIsChargeMode = async (modeBoolean: boolean) => {
    await isChargeModeBucket.set(isChargeModeTypeStrToObj(modeBoolean));
  };

  return {
    getIsChargeMode,
    handleIsChargeMode,
  };
};
