// Copyright (c) 2015 Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import React from 'react';

import * as Utils from 'utils/utils.jsx';

import AdminSettings from './admin_settings.jsx';
import BooleanSetting from './boolean_setting.jsx';
import DropdownSetting from './dropdown_setting.jsx';
import {FormattedHTMLMessage, FormattedMessage} from 'react-intl';
import SettingsGroup from './settings_group.jsx';
import TextSetting from './text_setting.jsx';

const RESTRICT_DIRECT_MESSAGE_ANY = 'any';
const RESTRICT_DIRECT_MESSAGE_TEAM = 'team';

export default class UsersAndTeamsSettings extends AdminSettings {
    constructor(props) {
        super(props);

        this.getConfigFromState = this.getConfigFromState.bind(this);

        this.renderSettings = this.renderSettings.bind(this);

        this.state = Object.assign(this.state, {
            enableUserCreation: props.config.TeamSettings.EnableUserCreation,
            enableTeamCreation: props.config.TeamSettings.EnableTeamCreation,
            maxUsersPerTeam: props.config.TeamSettings.MaxUsersPerTeam,
            maxChannelsPerTeam: props.config.TeamSettings.MaxChannelsPerTeam,
            restrictCreationToDomains: props.config.TeamSettings.RestrictCreationToDomains,
            restrictTeamNames: props.config.TeamSettings.RestrictTeamNames,
            restrictDirectMessage: props.config.TeamSettings.RestrictDirectMessage
        });
    }

    getConfigFromState(config) {
        config.TeamSettings.EnableUserCreation = this.state.enableUserCreation;
        config.TeamSettings.EnableTeamCreation = this.state.enableTeamCreation;
        config.TeamSettings.MaxUsersPerTeam = this.parseIntNonZero(this.state.maxUsersPerTeam);
        config.TeamSettings.MaxChannelsPerTeam = this.parseIntNonZero(this.state.maxChannelsPerTeam);
        config.TeamSettings.RestrictCreationToDomains = this.state.restrictCreationToDomains;
        config.TeamSettings.RestrictTeamNames = this.state.restrictTeamNames;
        config.TeamSettings.RestrictDirectMessage = this.state.restrictDirectMessage;

        return config;
    }

    renderTitle() {
        return (
            <h3>
                <FormattedMessage
                    id='admin.general.usersAndTeams'
                    defaultMessage='Users and Teams'
                />
            </h3>
        );
    }

    renderSettings() {
        return (
            <SettingsGroup>
                <BooleanSetting
                    id='enableUserCreation'
                    label={
                        <FormattedMessage
                            id='admin.team.userCreationTitle'
                            defaultMessage='Enable User Creation: '
                        />
                    }
                    helpText={
                        <FormattedMessage
                            id='admin.team.userCreationDescription'
                            defaultMessage='When false, the ability to create accounts is disabled. The create account button displays error when pressed.'
                        />
                    }
                    value={this.state.enableUserCreation}
                    onChange={this.handleChange}
                />
                <BooleanSetting
                    id='enableTeamCreation'
                    label={
                        <FormattedMessage
                            id='admin.team.teamCreationTitle'
                            defaultMessage='Enable Team Creation: '
                        />
                    }
                    helpText={
                        <FormattedMessage
                            id='admin.team.teamCreationDescription'
                            defaultMessage='When false, the ability to create teams is disabled. The create team button displays error when pressed.'
                        />
                    }
                    value={this.state.enableTeamCreation}
                    onChange={this.handleChange}
                />
                <TextSetting
                    id='maxUsersPerTeam'
                    label={
                        <FormattedMessage
                            id='admin.team.maxUsersTitle'
                            defaultMessage='Max Users Per Team:'
                        />
                    }
                    placeholder={Utils.localizeMessage('admin.team.maxUsersExample', 'Ex "25"')}
                    helpText={
                        <FormattedMessage
                            id='admin.team.maxUsersDescription'
                            defaultMessage='Maximum total number of users per team, including both active and inactive users.'
                        />
                    }
                    value={this.state.maxUsersPerTeam}
                    onChange={this.handleChange}
                />
                <TextSetting
                    id='restrictCreationToDomains'
                    label={
                        <FormattedMessage
                            id='admin.team.restrictTitle'
                            defaultMessage='Restrict Creation To Domains:'
                        />
                    }
                    placeholder={Utils.localizeMessage('admin.team.restrictExample', 'Ex "corp.mattermost.com, mattermost.org"')}
                    helpText={
                        <FormattedMessage
                            id='admin.team.restrictDescription'
                            defaultMessage='Teams and user accounts can only be created from a specific domain (e.g. "mattermost.org") or list of comma-separated domains (e.g. "corp.mattermost.com, mattermost.org").'
                        />
                    }
                    value={this.state.restrictCreationToDomains}
                    onChange={this.handleChange}
                />
                <BooleanSetting
                    id='restrictTeamNames'
                    label={
                        <FormattedMessage
                            id='admin.team.restrictNameTitle'
                            defaultMessage='Restrict Team Names: '
                        />
                    }
                    helpText={
                        <FormattedMessage
                            id='admin.team.restrictNameDesc'
                            defaultMessage='When true, You cannot create a team name with reserved words like www, admin, support, test, channel, etc'
                        />
                    }
                    value={this.state.restrictTeamNames}
                    onChange={this.handleChange}
                />
                <DropdownSetting
                    id='restrictDirectMessage'
                    values={[
                        {value: RESTRICT_DIRECT_MESSAGE_ANY, text: Utils.localizeMessage('admin.team.restrict_direct_message_any', 'Any user on the Mattermost server')},
                        {value: RESTRICT_DIRECT_MESSAGE_TEAM, text: Utils.localizeMessage('admin.team.restrict_direct_message_team', 'Any member of the team')}
                    ]}
                    label={
                        <FormattedMessage
                            id='admin.team.restrictDirectMessage'
                            defaultMessage='Enable users to open Direct Message channels with:'
                        />
                    }
                    helpText={
                        <FormattedHTMLMessage
                            id='admin.team.restrictDirectMessageDesc'
                            defaultMessage='"Any user on the Mattermost server" enables users to open a Direct Message channel with any user on the server, even if they are not on any teams together. "Any member of the team" limits the ability to open Direct Message channels to only users who are in the same team.'
                        />
                    }
                    value={this.state.restrictDirectMessage}
                    onChange={this.handleChange}
                />
            </SettingsGroup>
        );
    }
}
