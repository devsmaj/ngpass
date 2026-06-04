Please fix NG PASS scan upload and camera frame.

Work on branch: "ngpass-scan-onboarding".

1. Fix OCR upload error:
   Current error on phone:
      "Unsupported FormDataPart implementation"

      Replace FormData upload with "expo-file-system" uploadAsync.

      Install:
      "npx expo install expo-file-system"

      Update "src/services/api.ts":

      - import expo-file-system
      - keep API_URL as "https://ngpass.onrender.com/api"
      - make "scanDocument(imageUri)" upload image to "/api/ocr" using:
        - fieldName: "document"
          - httpMethod: "POST"
            - uploadType: "MULTIPART"
              - mimeType: "image/jpeg"
              - return parsed JSON safely.

              2. Fix camera frame UI in "src/app/scan-id.tsx":
                 Make it match the provided reference screenshots:

                 - full screen camera
                 - dark transparent overlay
                 - instruction text above the frame, not inside frame
                 - passport frame: large outer white rectangle centered, inner bottom MRZ box with "<<<<"
                 - ID frame: large outer rectangle centered, inner rounded rectangle with 3 horizontal white lines
                 - close X bottom-right
                 - capture button must not overlap the frame/text

                 3. Keep existing flow:
                    Passport:
                       "scan-id?doc=passport → confirm-details"

                       NIN:
                       "scan-id?doc=nin → scan-id-back → confirm-details"

                       Do not break backend, storage, register, login, face verification, or tabs.