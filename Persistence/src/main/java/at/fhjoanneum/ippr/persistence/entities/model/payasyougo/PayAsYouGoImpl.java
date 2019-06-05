package at.fhjoanneum.ippr.persistence.entities.model.payasyougo;

import at.fhjoanneum.ippr.persistence.objects.model.payasyougo.PayAsYouGo;
import javax.validation.constraints.NotNull;
import javax.persistence.*;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import java.time.LocalDateTime;

@Entity(name="pay_as_you_go")
@XmlRootElement
public class PayAsYouGoImpl implements PayAsYouGo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int entry_id;

    @Column
    @NotNull
    private int pi_id;

    @Column
    @Size(max = 255)
    private String process_name;

    @Column
    private int org_id;

    @Column
    @NotNull
    private LocalDateTime datetime_start;

    @Column
    private LocalDateTime datetime_end;

    @Column
    @Size(max = 255)
    private String duration;

    @Column
    @NotNull
    private Float rate;

    @Column
    private Float total_cost;

    PayAsYouGoImpl() {}

    public PayAsYouGoImpl(final int pi_id, final String process_name, final int org_id,
                   final LocalDateTime datetime_start, final Float rate) {
        this.pi_id = pi_id;
        this.process_name = process_name;
        this.org_id = org_id;
        this.datetime_start = datetime_start;
        this.rate = rate;
    }

    PayAsYouGoImpl(final int entry_id, final int pi_id, final String process_name, final int org_id,
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

    @Override
    public int getEntryId() { return entry_id; }

    @Override
    public int getPiId() { return pi_id; }

    @Override
    public String getProcessName() { return process_name; }

    @Override
    public int getOrgId() { return org_id; }

    @Override
    public LocalDateTime getDateTimeStart() { return datetime_start; }

    @Override
    public LocalDateTime getDateTimeEnd() { return datetime_end; }

    @Override
    public String getDuration() { return duration; }

    @Override
    public Float getRate() { return rate; }

    @Override
    public Float getTotalCost() { return total_cost; }

}
