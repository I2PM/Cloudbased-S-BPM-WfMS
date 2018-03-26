#!/usr/bin/env bash
echo starting EBUSA2017 on UNIX
echo ======================================
echo checking OS ...

OS='unknown'
UNAMESTR=`uname`

if [ $UNAMESTR=='Linux' ]; then
    OS='linux'
    echo Linux detected ...
elif [ "$UNAMESTR"=='Darwin' ]; then
    OS='mac'
    echo Mac detected ...
else
    echo No supported UNIX system detected
fi
echo ======================================

# start on Linux // tested with Ubuntu 17.10 running X11/Gnome
if [ "$OS"=='linux' ]; then
    echo
    echo booting services
    echo ======================================
    echo - ServiceDiscovery
    x-terminal-emulator -e bash start_service_discovery.sh
    echo - ConfigurationService
    x-terminal-emulator -e bash start_configuration_service.sh
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
    echo ======================================
    echo booting services done.


# TODO: Modify cmds for starting bash scripts in new terminals - test
# start on MAC
elif [ "$OS"=='mac' ]; then
    echo
    echo booting services
    echo ======================================
    echo - ServiceDiscovery
    #TODO -e bash start_service_discovery.sh
    echo - ConfigurationService
    #TODO -e bash start_configuration_service.sh
    echo - ProcessModelStorage
    #TODO bash start_pms.sh
    echo - ProcessEngine
    #TODO bash start_engine.sh
    echo - Gateway
    #TODO bash start_gateway.sh
    echo - ExternalCommunicator
    #TODO bash start_ec.sh
    echo - EventLogger
    #TODO bash start_event_logger.sh
    echo - GUI
    #TODO bash start_gui.sh
    echo ======================================
    echo booting services done.

else
    echo Process stopped!
fi

wait
