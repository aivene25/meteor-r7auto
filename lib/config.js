AdminConfig = {
  name: "R7Auto Admin",
  adminEmails: ["eneroakerele@gmail.com", "olamideodusola@gmail.com"],
  nonAdminRedirectRoute: "/register",
  collections: {
    Posts: {
      tableColumns: [
        { label: "Title", name: "Title" },
        { label: "Content", name: "Content" }
      ]
    },
    Services: {
      tableColumns: [
        { label: "Service", name: "Service" },
        { label: "ShortDescription", name: "ShortDescription" },
        { label: "Icon", name: "Icon" },
        { label: "Price", name: "Price" }
      ]
    },
    Cars: {
      tableColumns: [
        { label: "Name", name: "Name" },
        { label: "Description", name: "Description" },
        { label: "Price", name: "Price" },
        { label: "Year", name: "Year" }
      ]
    },
    SpareParts: {
      tableColumns: [
        { label: "Title", name: "Title" },
        { label: "Description", name: "Description" },
        { label: "Category", name: "Category" },
        { label: "Price", name: "Price" }
      ]
    }
  }
};
