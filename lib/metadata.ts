import type { Metadata } from "next"
import { constants } from "@/lib/constants"

export const metadata: Metadata = {
  applicationName: constants.APP_NAME,
  title: {
    default: constants.APP_NAME,
    template: `${constants.APP_NAME} | %s`,
  },
}
