package at.fhjoanneum.ippr.commons.dto.payasyougo;

import java.time.LocalDateTime;

public class PayAsYouGoDTO {

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

    public PayAsYouGoDTO(final int entry_id, final int pi_id, final String process_name, final int org_id,
                        final LocalDateTime datetime_start, final Float rate) {
        this.entry_id = entry_id;
        this.pi_id = pi_id;
        this.process_name = process_name;
        this.org_id = org_id;
        this.datetime_start = datetime_start;
        this.rate = rate;
    }

    public PayAsYouGoDTO(final int entry_id, final int pi_id, final String process_name, final int org_id,
                        final LocalDateTime datetime_start, final LocalDateTime datetime_end,
                        final String duration, final Float rate, final Float total_cost) {
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

    public int getEntryId() { return entry_id; }

    public int getPiId() { return pi_id; }

    public String getProcessName() { return process_name; }

    public int getOrgId() { return org_id; }

    public LocalDateTime getDateTimeStart() { return datetime_start; }

    public LocalDateTime getDateTimeEnd() { return datetime_end; }

    public String getDuration() { return duration; }

    public Float getRate() { return rate; }

    public Float getTotalCost() { return total_cost; }

}
