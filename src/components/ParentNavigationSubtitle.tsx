import React from 'react';
import type {StyleProp, ViewStyle} from 'react-native';
import useLocalize from '@hooks/useLocalize';
import useNetwork from '@hooks/useNetwork';
import useThemeStyles from '@hooks/useThemeStyles';
import Navigation from '@libs/Navigation/Navigation';
import * as ReportActionsUtils from '@libs/ReportActionsUtils';
import CONST from '@src/CONST';
import type {ParentNavigationSummaryParams} from '@src/languages/types';
import ROUTES from '@src/ROUTES';
import PressableWithoutFeedback from './Pressable/PressableWithoutFeedback';
import Text from './Text';
import TextLink from './TextLink';

type ParentNavigationSubtitleProps = {
    parentNavigationSubtitleData: ParentNavigationSummaryParams;

    /** parent Report ID */
    parentReportID?: string;

    /** parent Report Action ID */
    parentReportActionID?: string;

    /** PressableWithoutFeedack additional styles */
    pressableStyles?: StyleProp<ViewStyle>;
};

function ParentNavigationSubtitle({parentNavigationSubtitleData, parentReportActionID, parentReportID = '', pressableStyles}: ParentNavigationSubtitleProps) {
    const styles = useThemeStyles();
    const {workspaceName, reportName} = parentNavigationSubtitleData;
    const {isOffline} = useNetwork();
    const {translate} = useLocalize();

    // We should not display the parent navigation subtitle if the user does not have access to the parent chat (the reportName is empty in this case)
    if (!reportName) {
        return;
    }

    return (
        <Text
            style={[styles.optionAlternateText]}
            accessibilityLabel={translate('threads.parentNavigationSummary', {reportName, workspaceName})}
            role={CONST.ROLE.LINK}
            numberOfLines={1}
            textBreakStrategy="highQuality"
        >
            {!!reportName && (
                <>
                    <Text style={[styles.optionAlternateText, styles.textLabelSupporting]}>{`${translate('threads.from')} `}</Text>
                    <TextLink
                        onPress={() => {
                            const parentAction = ReportActionsUtils.getReportAction(parentReportID, parentReportActionID ?? '-1');
                            const isVisibleAction = ReportActionsUtils.shouldReportActionBeVisible(parentAction, parentAction?.reportActionID ?? '-1');
                            // Pop the thread report screen before navigating to the chat report.
                            Navigation.goBack(ROUTES.REPORT_WITH_ID.getRoute(parentReportID));
                            if (isVisibleAction && !isOffline) {
                                // Pop the chat report screen before navigating to the linked report action.
                                Navigation.goBack(ROUTES.REPORT_WITH_ID.getRoute(parentReportID, parentReportActionID));
                            }
                        }}
                        style={[styles.optionAlternateText, styles.textLabelSupporting, styles.link]}
                    >
                        {reportName || (workspaceName ? `${translate('threads.in')} ${workspaceName}` : '')}
                    </TextLink>
                </>
            )}
        </Text>
    );
}

ParentNavigationSubtitle.displayName = 'ParentNavigationSubtitle';
export default ParentNavigationSubtitle;

{
    /* <PressableWithoutFeedback
            onPress={() => {
                const parentAction = ReportActionsUtils.getReportAction(parentReportID, parentReportActionID ?? '-1');
                const isVisibleAction = ReportActionsUtils.shouldReportActionBeVisible(parentAction, parentAction?.reportActionID ?? '-1');
                // Pop the thread report screen before navigating to the chat report.
                Navigation.goBack(ROUTES.REPORT_WITH_ID.getRoute(parentReportID));
                if (isVisibleAction && !isOffline) {
                    // Pop the chat report screen before navigating to the linked report action.
                    Navigation.goBack(ROUTES.REPORT_WITH_ID.getRoute(parentReportID, parentReportActionID));
                }
            }}
            accessibilityLabel={translate('threads.parentNavigationSummary', {reportName, workspaceName})}
            role={CONST.ROLE.LINK}
            style={pressableStyles}
        >
            <Text
                style={[styles.optionAlternateText]}
                numberOfLines={1}
            >
                {!!reportName && (
                    <>
                        <Text style={[styles.optionAlternateText, styles.textLabelSupporting]}>{`${translate('threads.from')} `}</Text>
                        <Text style={[styles.optionAlternateText, styles.textLabelSupporting, styles.link]}>{reportName}</Text>
                    </>
                )}
                {!!workspaceName && <Text style={[styles.optionAlternateText, styles.textLabelSupporting]}>{` ${translate('threads.in')} ${workspaceName}`}</Text>}
            </Text>
        </PressableWithoutFeedback> */
}
