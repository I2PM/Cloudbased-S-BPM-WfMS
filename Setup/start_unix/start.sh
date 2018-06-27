#!/usr/bin/env bash
echo starting EBUSA2017 on UNIX
echo ======================================
echo checking OS ...

OS='unknown'
devMode='false'
UNAMESTR=$(uname)

if [[ "$UNAMESTR" == 'Linux' ]]; then
    OS='linux'
    echo Linux detected ...
elif [[ "$UNAMESTR" == 'Darwin' ]]; then
    OS='macOS'
    echo macOS detected ...
else
    echo No supported UNIX system detected
fi

if [[ "$@" == '-dev' ]]; then
    devMode='true'
    echo Development mode activated.
    echo The execution of the ConfigurationService will be omitted.
elif [[ "$@" == '-dev' ]]; then
    devMode='false'
    echo Normal mode activated.
    echo All services will be executed normally.
else
    echo No \(recognized\) mode was passed as an argument.
    echo All services will be executed normally.
fi

echo ======================================

# start on Linux // tested with Ubuntu 17.10 running X11/Gnome
if [[ "$OS" == 'linux' ]]; then
    echo
    echo booting services
    echo ======================================
    echo - ServiceDiscovery
    x-terminal-emulator -e bash start_service_discovery.sh
    if [[ "$devMode" == 'false' ]]; then
    echo - ConfigurationService
    x-terminal-emulator -e bash start_configuration_service.sh
    fi
    echo - ProcessModelStorage
    x-terminal-emulator -e bash start_pms.sh
    echo - ProcessEngine
    x-terminal-emulator -e bash start_engine.sh
    echo - Gateway
    x-terminal-emulator -e bash start_gateway.sh
    echo - ExternalCommunicator
    x-terminal-emulator -e bash start_ec.sh
    echo - EventLogger
    x-terminal-emulator -e bash start_event_logger.sh
    echo - GUI
    x-terminal-emulator -e bash start_gui.sh
    echo - ModellingPlatform
    x-terminal-emulator -e bash start_mpf.sh
    echo - ModellingPlatform
    x-terminal-emulator -e bash start_process_store.sh
    echo ======================================
    echo booting services done.



# start on macOS // tested with macOS Sierra (10.12.6) & macOS High Sierra (10.13.3)
# tested with normal bash and zsh
elif [[ "$OS" == 'macOS' ]]; then
    info_log_cfg_service="Tab3 - ConfigurationService"
    injectCmd_new_tab="tell application \"System Events\" to keystroke \"t\" using {command down}"
    injectCmd_delay="delay 2"
    injectCmd_start_config_service="tell application \"Terminal\" to do script \"./start_configuration_service.sh\" in selected tab of the front window"
    if [[ "$devMode" == 'true' ]]; then
        info_log_cfg_service="Tab3 - EMPTY (ConfigurationService disabled in dev mode)"
        injectCmd_start_config_service="tell application \"Terminal\" to do script \"ConfigurationService was not executed because the dev mode was selected!\" in selected tab of front window"
    fi
    echo Running AppleScript.
    echo New Terminal window will open to run scripts.
    echo ======================================
    echo Tab2 - ServiceDiscovery && echo ${info_log_cfg_service} && echo Tab4 - ProcessModelStorage \
    && echo Tab5 - ProcessEngine && echo Tab6 - Gateway && echo Tab7 - ExternalCommunicator && echo Tab8 - EventLogger \
    && echo Tab9 - ProcessStore && echo Tab10 - GUI && echo Tab11 - Modelling Platform
    echo ======================================
    osascript \
        -e "tell application \"Terminal\" to activate" \
        -e "tell application \"Terminal\" to set bounds of front window to {500, 200, 1700, 750}" \
        -e "${injectCmd_delay}" \
        -e "tell application \"System Events\" to keystroke \"t\" using {command down}" \
        -e "${injectCmd_delay}" \
        -e "tell application \"Terminal\" to do script \"cd $(PWD)\" in selected tab of the front window" \
        -e "${injectCmd_delay}" \
        -e "tell application \"Terminal\" to do script \"chmod +x *.sh\" in selected tab of the front window" \
        -e "${injectCmd_delay}" \
        -e "tell application \"Terminal\" to do script \"./start_service_discovery.sh\" in selected tab of the front window" \
        -e "${injectCmd_new_tab}" \
        -e "${injectCmd_delay}" \
        -e "${injectCmd_start_config_service}" \
        -e "tell application \"System Events\" to keystroke \"t\" using {command down}" \
        -e "${injectCmd_delay}" \
        -e "tell application \"Terminal\" to do script \"./start_pms.sh\" in selected tab of the front window" \
        -e "tell application \"System Events\" to keystroke \"t\" using {command down}" \
        -e "${injectCmd_delay}" \
        -e "tell application \"Terminal\" to do script \"./start_engine.sh\" in selected tab of the front window" \
        -e "tell application \"System Events\" to keystroke \"t\" using {command down}" \
        -e "${injectCmd_delay}" \
        -e "tell application \"Terminal\" to do script \"./start_gateway.sh\" in selected tab of the front window" \
        -e "tell application \"System Events\" to keystroke \"t\" using {command down}" \
        -e "${injectCmd_delay}" \
        -e "tell application \"Terminal\" to do script \"./start_ec.sh\" in selected tab of the front window" \
        -e "tell application \"System Events\" to keystroke \"t\" using {command down}" \
        -e "${injectCmd_delay}" \
        -e "tell application \"Terminal\" to do script \"./start_event_logger.sh\" in selected tab of the front window" \
        -e "tell application \"System Events\" to keystroke \"t\" using {command down}" \
        -e "${injectCmd_delay}" \
        -e "tell application \"Terminal\" to do script \"./start_process_store.sh\" in selected tab of the front window" \
        -e "tell application \"System Events\" to keystroke \"t\" using {command down}" \
        -e "${injectCmd_delay}" \
        -e "tell application \"Terminal\" to do script \"./start_gui.sh\" in selected tab of the front window" \
        -e "tell application \"System Events\" to keystroke \"t\" using {command down}" \
        -e "${injectCmd_delay}" \
        -e "tell application \"Terminal\" to do script \"./start_mpf.sh\" in selected tab of the front window"
    echo All services have been executed!
    echo Check Terminal window and tabs for different services.
else
    echo Process stopped!
fi

wait
