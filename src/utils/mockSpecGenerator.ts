
export const mockSpecGenerator = (requirements: string): { 
  modules: string; 
  schemas: string; 
  pseudoCode: string;
} => {
  // In a real application, this would call an API or run a local AI model
  
  // For demo purposes, we'll generate some mock content based on the input
  const words = requirements.split(/\s+/);
  const wordCount = words.length;
  
  // Simple "analysis" - just checking length of input
  const complexity = wordCount < 50 ? 'simple' : wordCount < 100 ? 'moderate' : 'complex';
  
  // Extract some "keywords" for our mock output
  const potentialKeywords = words.filter(word => 
    word.length > 5 && 
    !['should', 'would', 'could', 'system'].includes(word.toLowerCase())
  );
  
  const keywords = [...new Set(potentialKeywords)].slice(0, 5).map(w => 
    w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
  );
  
  // Generate a basic module breakdown
  const modules = generateModules(requirements, keywords, complexity);
  
  // Generate mock schemas
  const schemas = generateSchemas(requirements, keywords, complexity);
  
  // Generate pseudo code
  const pseudoCode = generatePseudoCode(requirements, keywords, complexity);
  
  return {
    modules,
    schemas,
    pseudoCode
  };
};

function generateModules(requirements: string, keywords: string[], complexity: string): string {
  // Look for specific phrases that might indicate modules
  const userInterface = requirements.match(/user interface|ui|front-?end|display/i);
  const dataStorage = requirements.match(/database|storage|data|store/i);
  const authentication = requirements.match(/login|auth|permission|access/i);
  const reporting = requirements.match(/report|analytics|statistics|metrics/i);
  const communication = requirements.match(/notification|email|message|alert/i);

  let modulesText = `# System Modules\n\n`;
  
  // Core modules most systems would have
  modulesText += `## 1. Core Module\n`;
  modulesText += `- Handles central business logic\n`;
  modulesText += `- Coordinates between other modules\n`;
  modulesText += `- Implements core functionality requirements\n\n`;
  
  // Add UI module if detected
  if (userInterface) {
    modulesText += `## 2. User Interface Module\n`;
    modulesText += `- Provides user interaction capabilities\n`;
    modulesText += `- Implements responsive design patterns\n`;
    modulesText += `- Handles input validation and user feedback\n\n`;
  }
  
  // Add data module if detected
  if (dataStorage) {
    modulesText += `## 3. Data Management Module\n`;
    modulesText += `- Provides data persistence layer\n`;
    modulesText += `- Implements CRUD operations\n`;
    modulesText += `- Handles data validation and integrity\n\n`;
  }
  
  // Add auth module if detected
  if (authentication) {
    modulesText += `## 4. Authentication & Authorization Module\n`;
    modulesText += `- Manages user authentication\n`;
    modulesText += `- Implements role-based access control\n`;
    modulesText += `- Handles session management\n\n`;
  }
  
  // Add reporting if detected
  if (reporting) {
    modulesText += `## 5. Reporting Module\n`;
    modulesText += `- Generates system reports and analytics\n`;
    modulesText += `- Provides data visualization capabilities\n`;
    modulesText += `- Implements scheduled report generation\n\n`;
  }
  
  // Add notification if detected
  if (communication) {
    modulesText += `## 6. Notification Module\n`;
    modulesText += `- Handles system alerts and notifications\n`;
    modulesText += `- Manages email and messaging capabilities\n`;
    modulesText += `- Implements notification preferences\n\n`;
  }
  
  // Add an integration module for complex systems
  if (complexity === 'complex') {
    modulesText += `## 7. Integration Module\n`;
    modulesText += `- Provides API interfaces for external systems\n`;
    modulesText += `- Manages third-party service connections\n`;
    modulesText += `- Implements data transformation for external systems\n\n`;
  }
  
  // Add appropriate footnote based on complexity
  if (complexity === 'simple') {
    modulesText += `\n*Note: This is a preliminary module breakdown for a simple system and may require further refinement.*`;
  } else if (complexity === 'moderate') {
    modulesText += `\n*Note: Consider further decomposition of these modules based on specific business requirements.*`;
  } else {
    modulesText += `\n*Note: Given the complexity of requirements, consider a microservices architecture approach for better scalability.*`;
  }
  
  return modulesText;
}

function generateSchemas(requirements: string, keywords: string[], complexity: string): string {
  let schemasText = `# Data Schemas\n\n`;
  
  // User schema - almost all systems have users
  schemasText += `## User Schema\n\`\`\`json
{
  "id": "uuid",
  "username": "string",
  "email": "string",
  "password": "hashed_string",
  "role": "string",
  "created_at": "timestamp",
  "last_login": "timestamp"
}
\`\`\`\n\n`;

  // Look for evidence of certain entity types
  const hasCustomers = requirements.match(/customer|client|user/i);
  const hasProducts = requirements.match(/product|item|good|merchandise/i);
  const hasOrders = requirements.match(/order|purchase|transaction|buy/i);
  const hasContent = requirements.match(/content|article|post|message/i);
  
  // Add customer schema if detected
  if (hasCustomers) {
    schemasText += `## Customer Schema\n\`\`\`json
{
  "id": "uuid",
  "first_name": "string",
  "last_name": "string",
  "email": "string",
  "phone": "string",
  "address": {
    "street": "string",
    "city": "string",
    "state": "string",
    "postal_code": "string",
    "country": "string"
  },
  "status": "string",
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
\`\`\`\n\n`;
  }
  
  // Add product schema if detected
  if (hasProducts) {
    schemasText += `## Product Schema\n\`\`\`json
{
  "id": "uuid",
  "name": "string",
  "description": "string",
  "category": "string",
  "price": "decimal",
  "inventory_count": "integer",
  "attributes": "json_object",
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
\`\`\`\n\n`;
  }
  
  // Add order schema if detected
  if (hasOrders) {
    schemasText += `## Order Schema\n\`\`\`json
{
  "id": "uuid",
  "customer_id": "uuid",
  "status": "string",
  "total_amount": "decimal",
  "items": [
    {
      "product_id": "uuid",
      "quantity": "integer",
      "unit_price": "decimal",
      "subtotal": "decimal"
    }
  ],
  "payment_details": {
    "method": "string",
    "transaction_id": "string",
    "status": "string"
  },
  "shipping_address": "json_object",
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
\`\`\`\n\n`;
  }
  
  // Add content schema if detected
  if (hasContent) {
    schemasText += `## Content Schema\n\`\`\`json
{
  "id": "uuid",
  "title": "string",
  "body": "text",
  "author_id": "uuid",
  "status": "string",
  "tags": "string[]",
  "metadata": "json_object",
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
\`\`\`\n\n`;
  }
  
  // Add settings schema for complex systems
  if (complexity === 'complex') {
    schemasText += `## System Settings Schema\n\`\`\`json
{
  "id": "uuid",
  "setting_key": "string",
  "setting_value": "json",
  "setting_group": "string",
  "is_public": "boolean",
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
\`\`\`\n\n`;
  }
  
  // Add appropriate footnote based on complexity
  if (complexity === 'simple') {
    schemasText += `\n*Note: These are basic schema definitions and may need extension with additional fields based on business requirements.*`;
  } else if (complexity === 'moderate') {
    schemasText += `\n*Note: Consider normalization and relationship modeling between these schemas for database implementation.*`;
  } else {
    schemasText += `\n*Note: For production implementation, consider adding indexes, constraints, and optimizing for the specific database technology selected.*`;
  }
  
  return schemasText;
}

function generatePseudoCode(requirements: string, keywords: string[], complexity: string): string {
  let pseudoCodeText = `# Pseudo Code for Core Functionality\n\n`;
  
  // Authentication flow - common in many systems
  const hasAuth = requirements.match(/login|authentication|authorization|permission|access/i);
  if (hasAuth) {
    pseudoCodeText += `## Authentication Process\n\`\`\`
function login(username, password):
  // Input validation
  if username is empty or password is empty:
    return error("Username and password are required")
    
  // Get user from database
  user = database.findUserByUsername(username)
  
  if user is not found:
    return error("Invalid credentials")
    
  // Verify password
  if not passwordHashMatches(password, user.passwordHash):
    // Log failed attempt
    logFailedLoginAttempt(username, request.ip)
    return error("Invalid credentials")
  
  // Create session or JWT
  token = generateAuthToken(user.id, user.role)
  
  // Update last login timestamp
  database.updateLastLogin(user.id)
  
  return success(token, user)
\`\`\`\n\n`;
  }

  // CRUD operations - common in data-driven applications
  const hasCRUD = requirements.match(/add|edit|update|delete|remove|create|manage/i);
  if (hasCRUD) {
    pseudoCodeText += `## CRUD Operations\n\`\`\`
function createResource(data, userId):
  // Validate input
  validationResult = validateResourceData(data)
  if validationResult.hasErrors:
    return error(validationResult.errors)
  
  // Check permissions
  if not userHasPermission(userId, "resource:create"):
    return error("Unauthorized")
  
  // Prepare the resource data
  newResource = {
    ...data,
    created_by: userId,
    created_at: currentTimestamp(),
    updated_at: currentTimestamp(),
    status: "active"
  }
  
  // Save to database
  resourceId = database.insertResource(newResource)
  
  // Log activity
  logActivity(userId, "resource_created", resourceId)
  
  // Return the created resource
  return success(database.getResourceById(resourceId))

function getResourceById(resourceId, userId):
  // Check if resource exists
  resource = database.getResourceById(resourceId)
  
  if resource is null:
    return error("Resource not found")
  
  // Check permissions (may depend on resource ownership)
  if not userCanViewResource(userId, resource):
    return error("Unauthorized")
  
  return success(resource)

function updateResource(resourceId, data, userId):
  // Validate input
  validationResult = validateResourceData(data)
  if validationResult.hasErrors:
    return error(validationResult.errors)
  
  // Check if resource exists
  resource = database.getResourceById(resourceId)
  
  if resource is null:
    return error("Resource not found")
  
  // Check permissions
  if not userCanEditResource(userId, resource):
    return error("Unauthorized")
  
  // Prepare update data
  updateData = {
    ...data,
    updated_at: currentTimestamp(),
    updated_by: userId
  }
  
  // Update in database
  success = database.updateResource(resourceId, updateData)
  
  if not success:
    return error("Failed to update resource")
  
  // Log activity
  logActivity(userId, "resource_updated", resourceId)
  
  // Return updated resource
  return success(database.getResourceById(resourceId))

function deleteResource(resourceId, userId):
  // Check if resource exists
  resource = database.getResourceById(resourceId)
  
  if resource is null:
    return error("Resource not found")
  
  // Check permissions
  if not userCanDeleteResource(userId, resource):
    return error("Unauthorized")
  
  // Soft delete or hard delete based on requirements
  if softDeleteEnabled:
    success = database.updateResource(resourceId, {
      status: "deleted",
      deleted_at: currentTimestamp(),
      deleted_by: userId
    })
  else:
    success = database.deleteResource(resourceId)
  
  if not success:
    return error("Failed to delete resource")
  
  // Log activity
  logActivity(userId, "resource_deleted", resourceId)
  
  return success(true)
\`\`\`\n\n`;
  }

  // Add reporting functionality if detected
  const hasReporting = requirements.match(/report|analytics|dashboard|statistics|metrics/i);
  if (hasReporting) {
    pseudoCodeText += `## Reporting Functionality\n\`\`\`
function generateReport(reportType, parameters, userId):
  // Validate input
  if not isValidReportType(reportType):
    return error("Invalid report type")
  
  // Check permissions
  if not userHasPermission(userId, "reports:generate"):
    return error("Unauthorized")
  
  // Initialize report data
  reportData = {
    type: reportType,
    generated_by: userId,
    generated_at: currentTimestamp(),
    parameters: parameters
  }
  
  // Get data based on report type
  switch reportType:
    case "sales":
      reportData.data = getSalesReportData(parameters)
    case "user_activity":
      reportData.data = getUserActivityReportData(parameters)
    case "performance":
      reportData.data = getPerformanceReportData(parameters)
    default:
      return error("Report type not implemented")
  
  // Process data for visualization
  reportData.charts = generateCharts(reportData.data, reportType)
  
  // Save report to database
  reportId = database.saveReport(reportData)
  
  // Log activity
  logActivity(userId, "report_generated", reportId)
  
  return success(reportData)
\`\`\`\n\n`;
  }

  // Add workflow process if complexity is moderate or complex
  if (complexity !== 'simple') {
    pseudoCodeText += `## Workflow Processing\n\`\`\`
function processWorkflowStep(workflowId, stepId, actionData, userId):
  // Get current workflow state
  workflow = database.getWorkflowById(workflowId)
  
  if workflow is null:
    return error("Workflow not found")
  
  // Get step definition
  stepDefinition = getWorkflowStepDefinition(workflow.type, stepId)
  
  if stepDefinition is null:
    return error("Invalid workflow step")
  
  // Check if this is the current step
  if workflow.currentStep != stepId:
    return error("Action not allowed at this workflow stage")
  
  // Check user permissions
  if not userCanPerformAction(userId, workflow, stepDefinition, actionData):
    return error("Unauthorized")
  
  // Validate action data
  validation = validateActionData(actionData, stepDefinition)
  if validation.hasErrors:
    return error(validation.errors)
  
  // Execute actions
  result = executeStepActions(workflow, stepDefinition, actionData, userId)
  
  if result.hasErrors:
    return error(result.errors)
  
  // Determine next step
  nextStepId = determineNextStep(workflow, stepDefinition, actionData, result)
  
  // Update workflow state
  database.updateWorkflow(workflowId, {
    currentStep: nextStepId,
    lastUpdatedBy: userId,
    lastUpdatedAt: currentTimestamp(),
    history: [...workflow.history, {
      step: stepId,
      action: actionData.action,
      userId: userId,
      timestamp: currentTimestamp(),
      result: result.summary
    }]
  })
  
  // Trigger notifications
  sendWorkflowNotifications(workflow, stepId, nextStepId, userId)
  
  // Log activity
  logActivity(userId, "workflow_progressed", workflowId)
  
  // Return updated workflow
  return success(database.getWorkflowById(workflowId))
\`\`\`\n\n`;
  }
  
  // Add appropriate footnote based on complexity
  if (complexity === 'simple') {
    pseudoCodeText += `\n*Note: This pseudo code provides basic implementation concepts and would need error handling and edge case management in actual code.*`;
  } else if (complexity === 'moderate') {
    pseudoCodeText += `\n*Note: Consider adding transaction management and more robust error handling in the actual implementation.*`;
  } else {
    pseudoCodeText += `\n*Note: Production implementation should include comprehensive logging, performance optimization, and potentially a more event-driven architecture.*`;
  }
  
  return pseudoCodeText;
}
