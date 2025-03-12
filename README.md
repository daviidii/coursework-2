# Bug Report

## Project Name

API integration - E-commerce dashboard

## Bug

**Title:**
Bug on reusable form field component.

**Description:**
Yung form fields specifically, FormField.vue and FormTextArea.vue has a bug or something that requires a double tap of the key to recognize the input.

If the Form has a default value for example in editing mode. The initial value is not shown immediately, in order to show the default value, you need to type something on the field.

**Steps to Reproduce:**

1. Go to either the /product/add or /user/add or select a user or product to update in the view-all page (/products/view-all & /users/view-all).
2. Try to make an input on the form field.

**Expected Behavior:**
Immediately recognize and display the input.

**Actual Behavior:**
Does not recognize the first input but rather need to double tap a key.
