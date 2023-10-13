import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/styles';
import Text from './Text';
import Navigation from '../libs/Navigation/Navigation';
import ROUTES from '../ROUTES';
import useLocalize from '../hooks/useLocalize';
import TextLink from './TextLink';

const propTypes = {
    parentNavigationSubtitleData: PropTypes.shape({
        // Title of root report room
        rootReportName: PropTypes.string,

        // Name of workspace, if any
        workspaceName: PropTypes.string,
    }).isRequired,

    /** parent Report ID */
    parentReportID: PropTypes.string,
};

const defaultProps = {
    parentReportID: '',
};

function ParentNavigationSubtitle(props) {
    const {workspaceName, rootReportName} = props.parentNavigationSubtitleData;

    const {translate} = useLocalize();

    return (
        <Text
            style={[styles.optionAlternateText]}
            numberOfLines={1}
            textBreakStrategy="highQuality"
        >
            <Text style={[styles.optionAlternateText, styles.textLabelSupporting]}>{`${translate('threads.from')} `}</Text>
            <TextLink
                onPress={() => {
                    Navigation.navigate(ROUTES.REPORT_WITH_ID.getRoute(props.parentReportID));
                }}
                style={[styles.optionAlternateText, styles.textLabelSupporting, styles.link]}
            >
                <Text style={[styles.optionAlternateText, styles.textLabelSupporting, styles.link]}>{rootReportName}</Text>
                {Boolean(workspaceName) && <Text style={[styles.optionAlternateText, styles.textLabelSupporting]}>{` ${translate('threads.in')} ${workspaceName}`}</Text>}
            </TextLink>
        </Text>
    );
}

ParentNavigationSubtitle.defaultProps = defaultProps;
ParentNavigationSubtitle.propTypes = propTypes;
ParentNavigationSubtitle.displayName = 'ParentNavigationSubtitle';
export default ParentNavigationSubtitle;
