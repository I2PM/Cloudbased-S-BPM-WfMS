package at.fhjoanneum.ippr.commons.dto.payasyougo;

import java.time.LocalDateTime;

public class PayAsYouGoDTO {

    private static final long serialVersionUID = 5572713072426280439L;

    private int entry_id;
    private int pi_id;
    private String process_name;
    private int org_id;
    private LocalDateTime datetime_start;
    private LocalDateTime datetime_end;
    private String duration;
    private Float rate;
    private Float total_cost;

    public PayAsYouGoDTO() {}

    public PayAsYouGoDTO(int entry_id, int pi_id, String process_name, int org_id,
                        LocalDateTime datetime_start, Float rate) {
        this.entry_id = entry_id;
        this.pi_id = pi_id;
        this.process_name = process_name;
        this.org_id = org_id;
        this.datetime_start = datetime_start;
        this.rate = rate;
    }

    public PayAsYouGoDTO(int entry_id, int pi_id, String process_name, int org_id,
                        LocalDateTime datetime_start, LocalDateTime datetime_end,
                        String duration, Float rate, Float total_cost) {
        this.entry_id = entry_id;
        this.pi_id = pi_id;
        this.process_name = process_name;
        this.org_id = org_id;
        this.datetime_start = datetime_start;
        this.datetime_end = datetime_end;
        this.duration = duration;
        this.rate = rate;
        this.total_cost = total_cost;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public int getEntryId() { return entry_id; }

    public int getPiId() { return pi_id; }

    public String getProcessName() { return process_name; }

    public int getOrgId() { return org_id; }

    public LocalDateTime getDateTimeStart() { return datetime_start; }

    public LocalDateTime getDateTimeEnd() { return datetime_end; }

    public String getDuration() { return duration; }

    public Float getRate() { return rate; }

    public Float getTotalCost() { return total_cost; }


    public void setEntryId(int entryId) { entry_id = entryId; }

    public void setPiId(int piId) { pi_id= piId;}

    public void setProcessName(String name) { process_name=name; }

    public void setOrgId(int id) { org_id=id; }

    public void setDateTimeStart(LocalDateTime start) { datetime_start=start; }

    public void setDateTimeEnd(LocalDateTime end) { datetime_end=end; }

    public void setDuration(String dur) { duration=dur;}

    public void setRate(Float rate) { this.rate=rate; }

    public void setTotalCost(Float costs) { total_cost=costs; }

}
