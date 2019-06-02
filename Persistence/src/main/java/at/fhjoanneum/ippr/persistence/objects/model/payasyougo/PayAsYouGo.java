package at.fhjoanneum.ippr.persistence.objects.model.payasyougo;

import java.time.LocalDateTime;

public interface PayAsYouGo {

  int getEntryId();

  int getPiId();

  String getProcessName();

  int getOrgId();

  LocalDateTime getDateTimeStart();

  LocalDateTime getDateTimeEnd();

  String getDuration();

  Float getRate();

  Float getTotalCost();
}
