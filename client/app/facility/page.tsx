"use client";
import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/mui";
import { RJSFSchema } from "@rjsf/utils";
import {
  useAddFacilityMutation,
  useGetNestedOrganizationsQuery,
} from "@/redux/api/apiSlice";
import { Organization, Facility } from "../types";
import { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Link from "next/link";

const facilitySchema: RJSFSchema = {
  type: "object",
  required: [
    "facility_name",
    "facility_type",
    "status",
    "swrs_facility_id",
    "latitude",
    "longitude",
  ],
  properties: {
    organization_id: { type: "number" },
    facility_name: {
      type: "string",
      title: "Facility Name",
    },
    facility_type: {
      type: "string",
      title: "Facility Type",
    },
    status: {
      type: "string",
      title: "Status",
    },
    swrs_facility_id: {
      type: "number",
      title: "SWRS Facility ID",
    },
    latitude: {
      type: "number",
      title: "Latitude",
    },
    longitude: {
      type: "number",
      title: "Longitude",
    },
  },
};

const facilityUiSchema = {
  organization_id: {
    "ui:widget": "hidden",
  },
};

export default function FacilityPage() {
  const {
    data: organizations,
    isFetching: isFetchingOrganization,
    refetch,
  } = useGetNestedOrganizationsQuery();
  const [facilities, setFacilities] = useState([]);
  const [addFacility, { isLoading: isAddingFacility }] =
    useAddFacilityMutation();

  const [showFacilityForm, setShowFacilityForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [organizationId, setOrganizationId] = useState("");

  useEffect(() => {
    if (organizationId && !isFetchingOrganization)
      setFacilities(
        organizations?.results.filter(
          (organization: Organization) =>
            organization.id === Number(organizationId)
        )[0].facilities
      );
  }, [organizationId]);

  const facilitySubmitHandler = async (data: any) => {
    try {
      const updatedFormData = {
        ...data.formData,
        organization_id: organizationId,
      };
      await addFacility(updatedFormData).unwrap();
      // .then(() => {
      //   refetch();
      //   setFacilities(
      //     organizations?.filter(
      //       (organization: Organization) =>
      //         organization.id === Number(organizationId)
      //     )[0].facilities
      //   );
      // });
    } catch (err) {
      console.log(err);
    }
  };

  const facilityUpdateHandler = async (data: any) => {
    const facilitiesEndpoint = "http://127.0.0.1:8000/facilities/";
    const updatedFormData = {
      ...data.formData,
      organization_id: organizationId,
    };
    fetch(`${facilitiesEndpoint}${showEditForm}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFormData),
    }).then((response) => {
      console.log("response", response);
      return response.json();
    });
  };

  const handleChange = (event: any) => {
    setOrganizationId(event.target.value);
    setShowFacilityForm(false);
  };

  const formData = facilities.filter((node) => {
    console.log("node", node);
    console.log("showEditForm", showEditForm);
    return node.id === showEditForm;
  });
  // console.log("facilities", facilities);
  console.log("formData", formData[0]);
  return (
    <>
      <h1>Facility</h1>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Organization</InputLabel>
        <Select
          id="demo-simple-select"
          value={organizationId}
          label="Organization"
          onChange={handleChange}
          sx={{ mb: 2 }}
        >
          {organizations?.results.map((organization: Organization) => {
            return (
              <MenuItem value={organization.id} key={organization.id}>
                {organization.business_legal_name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      {facilities && facilities.length !== 0 && (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Facility Name</TableCell>
              <TableCell align="right">Facility Type</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">SWRS Facility ID</TableCell>
              <TableCell align="right">Latitude</TableCell>
              <TableCell align="right">Longitude</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {facilities.map((facility: Facility) => (
              <TableRow
                key={facility.facility_name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {facility.facility_name}
                </TableCell>
                <TableCell align="right">{facility.facility_type}</TableCell>
                <TableCell align="right">{facility.status}</TableCell>
                <TableCell align="right">{facility.swrs_facility_id}</TableCell>
                <TableCell align="right">{facility.latitude}</TableCell>
                <TableCell align="right">{facility.longitude}</TableCell>
                <TableCell align="right">
                  <Link href="#" passHref>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => setShowEditForm(facility.id)}
                    >
                      Edit
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {organizationId && !showFacilityForm && (
        <Button variant="contained" onClick={() => setShowFacilityForm(true)}>
          Add Facility
        </Button>
      )}
      {showFacilityForm && (
        <Form
          schema={facilitySchema}
          validator={validator}
          onSubmit={facilitySubmitHandler}
          disabled={isAddingFacility}
          uiSchema={facilityUiSchema}
        ></Form>
      )}
      {showEditForm && (
        <Form
          schema={facilitySchema}
          validator={validator}
          onSubmit={facilityUpdateHandler}
          disabled={isAddingFacility}
          uiSchema={facilityUiSchema}
          formData={formData[0]}
        ></Form>
      )}
    </>
  );
}
