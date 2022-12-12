export const colors={
    minium:"#FE4F27",
    azurite:"#034A95",
}

export const signedColor = (val:number)=> val>=0 ? colors.azurite: colors.minium; 