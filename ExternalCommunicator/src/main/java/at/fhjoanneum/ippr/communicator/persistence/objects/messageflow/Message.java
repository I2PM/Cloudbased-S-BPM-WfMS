package at.fhjoanneum.ippr.communicator.persistence.objects.messageflow;

import at.fhjoanneum.ippr.communicator.persistence.objects.basic.BasicOutboundConfiguration;

public interface Message {

  Long getId();

  String getTransferId();

  void setInternalData(String data);

  String getInternalData();

  void setExternalData(String data);

  String getExternalData();

  MessageState getMessageState();

  void setMessageState(MessageState messageState);

  void setOutboundConfiguration(BasicOutboundConfiguration outboundConfiguration);

  BasicOutboundConfiguration getOutboundConfiguration();
}