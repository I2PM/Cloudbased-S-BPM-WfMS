package at.fhjoanneum.ippr.persistence.entities.model.payasyougo;

import at.fhjoanneum.ippr.persistence.objects.model.payasyougo.PayAsYouGo;
import at.fhjoanneum.ippr.persistence.builder.Builder;
import java.time.LocalDateTime;
import static com.google.common.base.Preconditions.checkNotNull;

public class PayAsYouGoBuilder implements Builder<PayAsYouGo> {

    private int entry_id;
    private int pm_id;
    private String process_name;
    private int org_id;
    private LocalDateTime datetime_start;
    private LocalDateTime datetime_end;
    private String duration;
    private Float rate;
    private Float total_cost;

    public PayAsYouGoBuilder entry_id(final int entry_id) {
        //checkNotNull(entry_id);
        this.entry_id = entry_id;
        return this;
    }

    public PayAsYouGoBuilder pm_id(final int pm_id) {
        //checkNotNull(pm_id);
        this.pm_id = pm_id;
        return this;
    }

    public PayAsYouGoBuilder process_name(final String process_name) {
        this.process_name = process_name;
        return this;
    }

    public PayAsYouGoBuilder org_id(final int org_id) {
        //checkNotNull(org_id);
        this.org_id = org_id;
        return this;
    }

    public PayAsYouGoBuilder datetime_start(final LocalDateTime datetime_start) {
        checkNotNull(datetime_start);
        this.datetime_start = datetime_start;
        return this;
    }

    public PayAsYouGoBuilder datetime_end(final LocalDateTime datetime_end) {
        checkNotNull(datetime_end);
        this.datetime_end = datetime_end;
        return this;
    }

    public PayAsYouGoBuilder duration(final String duration) {
        this.duration = duration;
        return this;
    }

    public PayAsYouGoBuilder rate(final Float rate) {
        checkNotNull(rate);
        this.rate = rate;
        return this;
    }

    public PayAsYouGoBuilder total_cost(final Float total_cost) {
        this.total_cost = total_cost;
        return this;
    }

    @Override
    public PayAsYouGo build() {

        final PayAsYouGoImpl payg = new PayAsYouGoImpl(entry_id, pm_id, process_name,
                org_id, datetime_start, datetime_end, duration, rate, total_cost);
        return payg;
    }

}
