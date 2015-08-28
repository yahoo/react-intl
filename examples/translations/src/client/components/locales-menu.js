import React, {Component, PropTypes} from 'react';
import {intlContextTypes, defineMessage} from 'react-intl';

const enUSDescription = defineMessage({
    id: 'menu.item_en_us_description',
    defaultMessage: 'The default locale of this example app.',
});

const enUPPERDescription = defineMessage({
    id: 'menu.item_en_upper_description',
    defaultMessage: 'The fake, all uppercase "locale" for this example app.',
});

class LocalesMenu extends Component {
    render() {
        const {formatMessage} = this.context.intl;

        return (
            <menu>
                <li>
                    <a
                        href="/?locale=en-US"
                        title={formatMessage(enUSDescription)}
                    >
                        en-US
                    </a>
                </li>

                <li>
                    <a
                        href="/?locale=en-UPPER"
                        title={formatMessage(enUPPERDescription)}
                    >
                        en-UPPER
                    </a>
                </li>
            </menu>
        );
    }
}

LocalesMenu.contextTypes = {
    intl: PropTypes.shape(intlContextTypes).isRequired,
};

export default LocalesMenu;
