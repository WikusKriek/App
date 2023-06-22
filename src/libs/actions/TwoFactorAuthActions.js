import Onyx from 'react-native-onyx';
import {Linking} from 'react-native';
import ONYXKEYS from '../../ONYXKEYS';
import ROUTES from '../../ROUTES';
import Navigation from '../Navigation/Navigation';

let requiresTwoFactorAuth = false;
/**
 * Clear 2FA data if the flow is interrupted without finishing
 */
function clearTwoFactorAuthData() {
    Onyx.merge(ONYXKEYS.ACCOUNT, {recoveryCodes: '', twoFactorAuthSecretKey: ''});
}

function handleTwoFactorRedirect() {
    Linking.getInitialURL().then((url) => {
        if(!url.includes('two-factor-auth')){
            return;
        }

        if (requiresTwoFactorAuth) {
            Navigation.navigate(ROUTES.SETTINGS_2FA_IS_ENABLED);
        } else {
            Navigation.navigate(ROUTES.SETTINGS_2FA_CODES);
        }
    });
}
Onyx.connect({
    key: ONYXKEYS.ACCOUNT,
    callback: (val) => {
        if (requiresTwoFactorAuth === val.requiresTwoFactorAuth) {
            return;
        }
        requiresTwoFactorAuth = val.requiresTwoFactorAuth;

        // if (Navigation.getActiveRoute().includes('two-factor-auth')) {
        //     if (requiresTwoFactorAuth) {
        //         Navigation.navigate(ROUTES.SETTINGS_2FA_SUCCESS);
        //     } else {
        //         Navigation.navigate(ROUTES.SETTINGS_2FA_DISABLE);
        //     }
        // }
    }
});


export {
    // eslint-disable-next-line import/prefer-default-export
    clearTwoFactorAuthData,
    handleTwoFactorRedirect
};

