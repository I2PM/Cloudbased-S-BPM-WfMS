package at.fhjoanneum.ippr.processengine.parser.json;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;

import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.text.ParseException;


@Component
public class JsonDateParser implements JsonParser<LocalDate> {

  private static final Logger LOG = LoggerFactory.getLogger(JsonDateParser.class);


  @Override
  public boolean canParse(final String value) {
    try {

      LOG.info("in Function canParse with value: "+value);

      /*
      SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
      Date date = sdf.parse(value);
      long millisecond =date.getTime();

      LOG.info("millisecond format: "+millisecond);
*/

      long millisecond = ConvertStringDateToMilliseconds(value);
      //Long longDate = NumberUtils.createLong(value);

      //LOG.info("longDate: "+longDate);

      //Instant zoneDate = Instant.ofEpochMilli(longDate);

      //LOG.info("zoneDate: "+zoneDate);

      Instant.ofEpochMilli(millisecond).atZone(ZoneId.systemDefault())
          .toLocalDate();

      //LocalDate localDate = LocalDate.parse(value);

      //LOG.info("localDate: "+localDate);

      return true;
    } catch (final Exception e) {
      LOG.info("Exception!! message: "+e.getMessage());

      return false;
    }
  }

  @Override
  public LocalDate parse(final String value) {

    long millisecond = ConvertStringDateToMilliseconds(value);
/*
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    Date date = sdf.parse(value);
    long millisecond =date.getTime();*/

    //return LocalDate.parse(value);

    return Instant.ofEpochMilli(millisecond).atZone(ZoneId.systemDefault())
        .toLocalDate();
  }

  private long ConvertStringDateToMilliseconds(String dateString)
  {
    long millisecond = (long)-1;
    try {
      LOG.info("in Function canParse with value: "+dateString);

      SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
      Date date = sdf.parse(dateString);
      millisecond =date.getTime();

      LOG.info("millisecond format: "+millisecond);
    }    catch (final ParseException e) {
      LOG.info("Exception!! message: "+e.getMessage());
    }

    return millisecond;
  }

}
