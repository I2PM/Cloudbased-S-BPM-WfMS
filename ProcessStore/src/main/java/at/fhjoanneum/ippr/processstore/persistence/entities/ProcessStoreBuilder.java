package at.fhjoanneum.ippr.processstore.persistence.entities;

import at.fhjoanneum.ippr.processstore.persistence.Builder;
import at.fhjoanneum.ippr.processstore.persistence.objects.ProcessStoreObject;
import org.apache.commons.lang.StringUtils;

import static com.google.common.base.Preconditions.checkArgument;

public class ProcessStoreBuilder implements Builder<ProcessStoreObject> {

    private String processName;

    public ProcessStoreBuilder processName(final String processName){
        checkArgument(StringUtils.isNotBlank(processName));
        this.processName = processName;
        return this;
    }

    @Override
    public ProcessStoreObject build() {
        checkArgument(StringUtils.isNotBlank(processName));

        return new ProcessStoreObjectImpl(processName);
    }
}
