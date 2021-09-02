// check to see if the security field does not match the api,
// or if files have been submitted.
const submittedDocumentationMatchesOriginalData = (formData, formFiles, originalData) => {
  // security is the only field that is *not* a file.
  const originalSecurityField = originalData.security;
  const filesSubmitted = formFiles.length > 0;

  if ((originalSecurityField !== formData.security) || filesSubmitted) {
    return false;
  }
  return true;
};

module.exports = submittedDocumentationMatchesOriginalData;
