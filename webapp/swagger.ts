import { createSwaggerSpec } from "next-swagger-doc"

export const getApiDocs = async () => {
  return createSwaggerSpec({
    apiFolder: "app/api", // path to APIs
		autoDoc: true,
    definition: {
      openapi: "3.0.0",
      info: {
        title: "HandmadeHoliday API",
        version: "1.0.0",
      },
    },
  })
}
