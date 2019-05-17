package at.fhjoanneum.ippr.gateway.security.rbacmapping.retrieval;

import at.fhjoanneum.ippr.gateway.security.persistence.entities.cache.*;
import au.com.bytecode.opencsv.CSVReader;
import com.google.common.base.Splitter;
import com.google.common.collect.Maps;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class RBACRetrievalServiceImpl implements RBACRetrievalService {

    private static final Logger LOG = LoggerFactory.getLogger(RBACRetrievalServiceImpl.class);

    private static Map<String, CacheUser> users;
    private static Map<String, CacheRole> roles;
    private static Map<String, CacheRule> rules;

    @Override
    public Map<String, CacheUser> getSystemUsers(String pathToCsvs) {
        if (users == null) {
            users = readUsers(getSystemRoles(pathToCsvs), pathToCsvs);
        }
        return users;
    }

    @Override
    public Map<String, CacheRule> getSystemRules(String pathToCsv) {
        if (rules == null) {
            rules = readRules(pathToCsv);
        }
        return rules;
    }

    @Override
    public Map<String, CacheRole> getSystemRoles(String pathToCsv) {
        if (roles == null) {
            roles = readRoles(getSystemRules(pathToCsv), pathToCsv);
        }
        return roles;
    }


    private Map<String, CacheRule> readRules(String csvPath) {
        final Map<String, CacheRule> rules = Maps.newHashMap();
        List<List<String>> lines = this.readCsvLines(csvPath, "rules.csv");

        for (List<String> line : lines) {
            final CacheResource resource = new CacheResource(line.get(RuleRow.RESOURCE.index));
            final CacheCrudType crudType = new CacheCrudType(line.get(RuleRow.CRUD_TYPE.index));
            final CacheRule rule =
                    new CacheRule(line.get(RuleRow.SYSTEM_ID.index), resource, crudType);
            rules.put(rule.getSystemId(), rule);
        }
        return rules;
    }

    private List<List<String>> readCsvLines(String csvPath, String csvFileName) {
        List<List<String>> csvLines = new ArrayList<>();
        try (final InputStream is = this.getClass().getResourceAsStream(csvPath + csvFileName);
             CSVReader reader = new CSVReader(new InputStreamReader(is), '\n', '\'', 1)) {

            String[] nextLine;
            while ((nextLine = reader.readNext()) != null) {
                final List<String> values =
                        Splitter.on(';').omitEmptyStrings().trimResults().splitToList(nextLine[0]);
                csvLines.add(values);
            }
        } catch (final Exception e) {
            LOG.error(e.getMessage());
        }
        return csvLines;
    }


    private Map<String, CacheRole> readRoles(final Map<String, CacheRule> rules, String csvPath) {
        final Map<String, CacheRole> roles = Maps.newHashMap();

        for (List<String> line : readCsvLines(csvPath, "roles.csv")) {
            final String roleRulesRaw = RoleRow.RULES.index < line.size() ? line.get(RoleRow.RULES.index) : "";
            final List<CacheRule> roleRules = Splitter.on(',').omitEmptyStrings().trimResults().splitToList(roleRulesRaw).stream()
                    .map(systemId -> rules.get(systemId)).collect(Collectors.toList());
            final CacheRole parent = roles.get(line.get(RoleRow.PARENT.index));
            if (parent == null && !line.get(RoleRow.PARENT.index).equals("NULL")) {
                throw new RuntimeException("Parent role must be defined before child role in roles.csv");
            }
            final CacheRole role = new CacheRole(line.get(RoleRow.SYSTEM_ID.index),
                    line.get(RoleRow.NAME.index), roleRules, Boolean.parseBoolean(line.get(RoleRow.SUBJECTROLE.index)), null, parent);
            roles.put(role.getSystemId(), role);
        }
        return roles;
    }

    private Map<String, CacheUser> readUsers(final Map<String, CacheRole> roles, String csvPath) {
        final Map<String, CacheUser> users = Maps.newHashMap();

        for (List<String> line : readCsvLines(csvPath, "users.csv")) {
            final String userRolesRaw = line.get(UserRow.ROLES.index);
            final List<CacheRole> userRoles =
                    Splitter.on(',').omitEmptyStrings().trimResults().splitToList(userRolesRaw).stream()
                            .map(role -> roles.get(role)).collect(Collectors.toList());

            final CacheUser cacheUser = new CacheUser(line.get(UserRow.SYSTEM_ID.index),
                    line.get(UserRow.FIRST_NAME.index),
                    line.get(UserRow.LAST_NAME.index),
                    line.get(UserRow.USER_NAME.index),
                    line.get(UserRow.EMAIL.index),
                    //values.get(UserRow.ORGANISATION.index),
                    userRoles,
                    line.get(UserRow.PASSWORD.index));
            users.put(cacheUser.getEmail(), cacheUser);
        }
        return users;
    }

    private Map<String, CacheOrganization> readOrganizations() {
        final Map<String, CacheOrganization> organizations = Maps.newHashMap();

        try (final InputStream is = this.getClass().getResourceAsStream("/memoryusers/organizations.csv");
             CSVReader reader = new CSVReader(new InputStreamReader(is), '\n', '\'', 1)) {

            String[] nextLine;
            while ((nextLine = reader.readNext()) != null) {
                final List<String> values =
                        Splitter.on(';').omitEmptyStrings().trimResults().splitToList(nextLine[0]);
                final CacheOrganization organization =
                        new CacheOrganization(values.get(OrganizationRow.SYSTEM_ID.index), values.get(OrganizationRow.ORGANIZATION_NAME.index), values.get(OrganizationRow.ORGANISATION_DESCRIPTION.index));
                organizations.put(organization.getSystemId(), organization);
            }
        } catch (final Exception e) {
            LOG.error(e.getMessage());
        }

        return organizations;
    }

    private enum RuleRow {
        SYSTEM_ID(0), RESOURCE(1), CRUD_TYPE(2);

        private final int index;

        private RuleRow(final int index) {
            this.index = index;
        }
    }

    private enum RoleRow {
        NAME(0), SYSTEM_ID(1), RULES(2), SUBJECTROLE(3), PARENT(4);

        private final int index;

        private RoleRow(final int index) {
            this.index = index;
        }
    }

    private enum UserRow {
        USER_NAME(0), FIRST_NAME(1), LAST_NAME(2), PASSWORD(3), EMAIL(4), SYSTEM_ID(5), ROLES(6);

        private final int index;

        private UserRow(final int index) {
            this.index = index;
        }
    }

    private enum OrganizationRow {
        ORGANIZATION_NAME(0), ORGANISATION_DESCRIPTION(1), SYSTEM_ID(2);

        private final int index;

        private OrganizationRow(final int index) {
            this.index = index;
        }
    }
}
