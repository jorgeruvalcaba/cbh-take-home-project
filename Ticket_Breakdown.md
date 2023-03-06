# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts
posted by Facilities on our platform. We're working on a new feature which will
generate reports for our client Facilities containing info on how many hours
each Agent worked in a given quarter by summing up every Shift they worked.
Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning
  all Shifts worked that quarter, including some metadata about the Agent
  assigned to each
- A function `generateReport` is then called with the list of Shifts. It
  converts them into a PDF which can be submitted by the Facility for
  compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal
database id. We'd like to add the ability for Facilities to save their own
custom ids for each Agent they work with and use that id when generating reports
for them.**

Based on the information given, break this ticket down into 2-5 individual
tickets to perform. Provide as much detail for each ticket as you can, including
acceptance criteria, time/effort estimates, and implementation details. Feel
free to make informed guesses about any unknown details - you can't guess
"wrong".

You will be graded on the level of detail in each ticket, the clarity of the
execution plan within and between tickets, and the intelligibility of your
language. You don't need to be a native English speaker, but please proof-read
your work.

## Your Breakdown Here

### Ticket 1: Create new column in Agents table for custom ids

Description:

Add a new column in Agents table to store custom ids assigned by Facilities.
This column will be used to generate reports.

Acceptance Criteria:

- A new column named `facility_id` is added to Agents table.
- Data type of `facility_id` is varchar(50).
- `facility_id` is unique for each Agent.
- Facility should be able to insert/update `facility_id` for an Agent.
- The existing `id` column in the Agents table should remain unchanged.

Implementation Details:

- Create a new migration to add `facility_id` column to Agents table.
- Update the ORM model for the Agents table to include `facility_id` attribute.
- Create an API endpoint to update `facility_id` for an Agent.
- Add validation to ensure `facility_id` is unique for each Agent.

Effort Estimate: 3 story points

### Ticket 2: Update Shifts table to store `facility_id` in addition to `agent_id`

Description:

Update Shifts table to store both the internal database id and the custom id
assigned by Facilities for each Agent to use in the reports.

Acceptance Criteria:

- Add `facility_id` column to Shifts table.
- Modify the foreign key constraint to refer to both `facility_id` and
  `agent_id`.
- Reports are generated with both the internal database ids and the custom ids
  assigned by Facilities.

Implementation Details:

- Create a new migration to update Shifts table.
- Update the ORM model for Shifts table to include `facility_id` attribute.
- Modify the API endpoint that creates Shifts to use both `facility_id` and
  `agent_id`.
- Modify the `getShiftsByFacility` function to return both `facility_id` and
  `agent_id`.

Effort Estimate: 5 Story Points

### Ticket 3: Update the generateReport function to use `facility_id` instead of `agent_id`

Description: Update the generateReport function to use the custom id assigned by
Facilities in the reports instead of the internal database id.

Acceptance Criteria:

- Modify the `generateReport` function to use `facility_id` instead of
  `agent_id` if the custom id exists.
- Reports should display the custom ids assigned by Facilities if they exist,
  and the internal database ids if they do not.

Implementation Details:

- Modify the generateReport function to check if a custom id exists and use it
  if it does.
- If a custom id does not exist, use the internal database id instead.
- Modify the report template to display the custom ids if they exist, and the
  internal database ids if they do not.

Effort Estimate: 3 Story Points

### Ticket 4: Add `facility_id` to the Shifts report

Description: Add the custom id assigned by Facilities to the Shifts report.

Acceptance Criteria:

- Add a new column in the Shifts report to display the custom ids assigned by
  Facilities if they exist.
- Reports should display both the custom ids and internal database ids.

Implementation Details:

- Modify the report template to display the custom ids if they exist, and the
  internal database ids if they do not.

Effort Estimate: 2 Story Points

### Ticket 5: Update the report API endpoint to accept custom id parameter

Description: Update the report API endpoint to accept a query parameter to
generate reports using the custom ids assigned by Facilities if available,
otherwise use internal database ids.

Acceptance Criteria:

- Add a new query parameter to the report API endpoint to accept custom ids.
- If the parameter is passed, reports should be generated with the custom ids if
  they exist. If the custom id does not exist, use the internal database id
  instead.

Implementation Details:

- Modify the API endpoint to accept the new query parameter.
- Modify the `generateReport` function to use the custom ids when available,
  otherwise use internal database ids.

Effort Estimate: 2 Story Points

## "Guesses" for the exercise

- The current database schema probably looks something like this:
  - Facilities table (`id`, `name`, ...)
  - Agents table (`id`, `name`, `email`, ...)
  - Shifts table (`id`, `facility_id`, `agent_id`, `start_time`, `end_time`,
    ...)
  - There might also be additional tables like Users, Roles, etc. depending on
    the application's requirements.
- To implement the new feature, we'll need to add a new column to the Agents
  table to store the custom ids assigned by Facilities. This can be done using a
  database migration script.
- We'll also need to update the `generateReport` function to use the custom ids
  instead of the internal database ids when generating the reports. This can be
  done by joining the Shifts table with the Agents table on the agent_id column,
  and selecting the custom id column instead of the id column.
- We might also need to update the `getShiftsByFacility` function to return the
  custom id column along with the Shifts data, so that Facilities can see both
  the internal id and the custom id for each Agent. This can be done by
  modifying the SQL query used by the function to include the custom id column.
- Since custom ids are assigned by Facilities, we'll need to provide a way for
  Facilities to add, update, and delete custom ids for Agents. This can be done
  by adding new API endpoints or UI screens to the application, depending on how
  the Facilities interact with the platform.
- It's not mentioned whether the `id` column in the Agents table is the primary
  key or not, but I'm assuming it is, as it is not mentioned anywhere that the
  primary key will be changed.
- It's not mentioned if there will be any validation for the custom ids. For
  example, whether there will be any character limits, allowed characters, or
  any other restrictions. I'm assuming that there are no such restrictions.
- It's not mentioned if the custom ids assigned by the Facilities will be unique
  across all Facilities or just unique within each Facility. I'm assuming that
  it's unique within each Facility.
- It's not mentioned if there will be any additional changes needed to the UI.
  I'm assuming that the UI will remain unchanged, but it's possible that some
  changes might be needed to allow Facilities to enter and update custom ids for
  Agents.
