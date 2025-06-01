
window.onload = function() {
  // Build a system
  let url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  let options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "paths": {
      "/user/forgot-password": {
        "post": {
          "operationId": "UserController_forgotPassword",
          "summary": "Forgot password via ",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ForgotPasswordDTO"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "you can see an email sent successfully."
            }
          },
          "tags": [
            "users"
          ]
        }
      },
      "/user/change-password": {
        "post": {
          "operationId": "UserController_changePassword",
          "parameters": [],
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "users"
          ]
        }
      },
      "/user/resend-email": {
        "post": {
          "operationId": "UserController_resendEmailVerification",
          "summary": "Resend email verification",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/resendEmailVerificationDTO"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "A 6-digit verification code has been sent to your email."
            }
          },
          "tags": [
            "users"
          ]
        }
      },
      "/user/email-verification": {
        "post": {
          "operationId": "UserController_verificationEmail",
          "summary": "Email verification with token ",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/EmailVerificationDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "you can see an email sent successfully."
            }
          },
          "tags": [
            "users"
          ]
        }
      },
      "/user/verify-email-code": {
        "post": {
          "operationId": "UserController_verifyEmailWithCode",
          "summary": "Email verification with 6-digit code",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/EmailVerificationCodeDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Email verified successfully"
            }
          },
          "tags": [
            "users"
          ]
        }
      },
      "/user/recover-account": {
        "put": {
          "operationId": "UserController_recoverAccount",
          "summary": "Recover your account by Token",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/RecoveryAccountDTO"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "you can see a message you password changed successfully."
            }
          },
          "tags": [
            "users"
          ]
        }
      },
      "/user": {
        "get": {
          "operationId": "UserController_getUser",
          "parameters": [],
          "responses": {
            "200": {
              "description": "you can see message you can get profile information",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/User"
                  }
                }
              }
            }
          },
          "tags": [
            "users"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "put": {
          "operationId": "UserController_updateUser",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/updateProfile"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "you can see message that updates the profile",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/User"
                  }
                }
              }
            }
          },
          "tags": [
            "users"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/user/wallets": {
        "get": {
          "operationId": "UserController_showWallets",
          "summary": "get user's wallet address",
          "parameters": [],
          "responses": {
            "200": {
              "description": "user's wallets",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array"
                  }
                }
              }
            }
          },
          "tags": [
            "users"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/user/supported/wallet/networks": {
        "get": {
          "operationId": "UserController_getSupportedWallets",
          "summary": "get supported wallet networks",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "users"
          ]
        }
      },
      "/user/update/stripe-customer-ids": {
        "get": {
          "operationId": "UserController_updateUserStripeCustomerIds",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "users"
          ]
        }
      },
      "/user/update/users/register-type": {
        "get": {
          "operationId": "UserController_updateCustomersRegisterType",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "users"
          ]
        }
      },
      "/user/add/email/landing": {
        "post": {
          "operationId": "UserController_addEmail",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "example": {
                    "feature": "string",
                    "email": "string"
                  }
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "users"
          ]
        }
      },
      "/user/d3/verify": {
        "post": {
          "operationId": "UserController_verifyD3",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "example": {
                    "walletAddress": "0xE15898E1A95AC02C9B2b2895e908f0db5E318734",
                    "walletType": "EVM"
                  }
                }
              }
            }
          },
          "responses": {
            "default": {
              "description": "return false if wallet dont verify, otherwise returns user Id"
            }
          },
          "tags": [
            "users"
          ]
        }
      },
      "/user/ud/verify": {
        "post": {
          "operationId": "UserController_verifyUD",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "example": {
                    "walletAddress": "0xE15898E1A95AC02C9B2b2895e908f0db5E318734",
                    "walletType": "EVM"
                  }
                }
              }
            }
          },
          "responses": {
            "default": {
              "description": "return false if wallet dont verify, otherwise returns user Id"
            }
          },
          "tags": [
            "users"
          ]
        }
      },
      "/auth/register": {
        "post": {
          "operationId": "AuthController_createUser",
          "summary": "Register",
          "parameters": [
            {
              "name": "subscriptionId",
              "required": true,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "monthLength",
              "required": true,
              "in": "query",
              "schema": {
                "type": "number"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/RegisterDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Register using an email and password",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/User"
                  }
                }
              }
            }
          },
          "tags": [
            "auth"
          ]
        }
      },
      "/auth/supported/wallets": {
        "get": {
          "operationId": "AuthController_supportedWallets",
          "summary": "Get list of supported login methods",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "auth"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/auth/login/basic": {
        "post": {
          "operationId": "AuthController_login",
          "summary": "Login using basic credentials",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/LoginUserDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Return a JWT Token"
            }
          },
          "tags": [
            "auth"
          ]
        }
      },
      "/auth/login/wallet": {
        "post": {
          "operationId": "AuthController_loginViaWallet",
          "summary": "Login using crypto wallet",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/LoginViaWalletDTO"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Return a JWT Token"
            }
          },
          "tags": [
            "auth"
          ]
        }
      },
      "/auth/refresh-token": {
        "post": {
          "operationId": "AuthController_refreshToken",
          "summary": "Get new refresh and access token",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "auth"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/auth/logout": {
        "post": {
          "operationId": "AuthController_logout",
          "summary": "Logout",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "auth"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/auth/login/google": {
        "get": {
          "operationId": "AuthController_loginViaGoogleOauth",
          "summary": "Start Google OAuth Flow",
          "description": "Calling this api will redirect the client to google login page",
          "parameters": [
            {
              "name": "id",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "subscriptionId",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "referralCode",
              "required": true,
              "in": "query",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "auth"
          ]
        }
      },
      "/auth/login/google/callback": {
        "get": {
          "operationId": "AuthController_googleCallback",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "auth"
          ]
        }
      },
      "/auth/login/google/complete": {
        "post": {
          "operationId": "AuthController_completeGoogleRegister",
          "parameters": [],
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "auth"
          ]
        }
      },
      "/auth/nonce": {
        "get": {
          "operationId": "AuthController_getNonce",
          "parameters": [
            {
              "name": "wallet",
              "required": true,
              "in": "query",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "auth"
          ]
        }
      },
      "/product/public/types": {
        "get": {
          "operationId": "ProductController_getProdcutTypes",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/product/public/print-positions": {
        "get": {
          "operationId": "ProductController_getPrintPositions",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/product/public/print-services": {
        "get": {
          "operationId": "ProductController_getPrintServices",
          "parameters": [],
          "responses": {
            "200": {
              "description": "available services for the printed photo",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/M2MService"
                  }
                }
              }
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/product": {
        "post": {
          "operationId": "ProductController_createProduct",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/createProductDTO"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "you can see a message that created successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Product"
                  }
                }
              }
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            },
            {
              "bearer": []
            }
          ]
        },
        "get": {
          "operationId": "ProductController_getProducts",
          "parameters": [
            {
              "name": "page",
              "required": true,
              "in": "query",
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "description": "number of returned products",
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "filter",
              "required": false,
              "in": "query",
              "description": "you can search in product example: filter=title:shoes",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "data": "array of products",
                      "currentPage": "number of your page",
                      "totalPages": "number of all pages",
                      "hasNextPage": "true or false",
                      "hasPreviousPage": "true or false",
                      "nextPage": "number of next page or null",
                      "previousPage": "number of prev page or null",
                      "limit": "limit",
                      "totalDocuments": "number of total docs"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/product/addPrintfulOptions": {
        "get": {
          "operationId": "ProductController_modifyAndAddPrintfulOptions",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/product/all": {
        "get": {
          "operationId": "ProductController_getAllProducts",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/product/{id}": {
        "get": {
          "operationId": "ProductController_getProduct",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "shopname",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "recorded",
              "required": false,
              "in": "query",
              "schema": {
                "type": "boolean"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "you can see a message that is product",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Product"
                  }
                }
              }
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "delete": {
          "operationId": "ProductController_deleteProduct",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "product id",
              "schema": {}
            }
          ],
          "responses": {
            "200": {
              "description": "you can see a message that product was deleted"
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "put": {
          "operationId": "ProductController_updateProduct",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "product id",
              "schema": {}
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/updateProductDTO"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "you can see update profile.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Product"
                  }
                }
              }
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/product/recorded/{id}": {
        "get": {
          "operationId": "ProductController_getRecordedProducts",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "you can see a message that is a recorded product",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Product"
                  }
                }
              }
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/product/public/{id}": {
        "get": {
          "operationId": "ProductController_getProductByID",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "product id",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "shopname",
              "required": false,
              "in": "query",
              "description": "Only return SKU's owned by the owner of this shop .",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "recorded",
              "required": false,
              "in": "query",
              "description": "recorded",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "you can see a message that is product",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Product"
                  }
                }
              }
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/product/upload/external/images": {
        "post": {
          "operationId": "ProductController_uploadExternalImage",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "array of objects that contains thumbnails and original picture"
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/product/import": {
        "post": {
          "operationId": "ProductController_importProduct",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/importProductDTO"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "import product"
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/product/public/import": {
        "post": {
          "operationId": "ProductController_importPublicProduct",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/importPublicProductDTO"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "import product"
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/product/public/shop/{shopName}": {
        "get": {
          "operationId": "ProductController_getProductsByShopName",
          "parameters": [
            {
              "name": "shopName",
              "required": true,
              "in": "path",
              "example": "shop name",
              "description": "name of shop",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "search",
              "required": false,
              "in": "query",
              "description": "Search text to filter products by title",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "page",
              "required": false,
              "in": "query",
              "description": "Page number for pagination",
              "schema": {
                "default": 1,
                "type": "number"
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "description": "Number of items per page",
              "schema": {
                "default": 20,
                "type": "number"
              }
            },
            {
              "name": "minPrice",
              "required": false,
              "in": "query",
              "description": "Minimum price filter",
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "maxPrice",
              "required": false,
              "in": "query",
              "description": "Maximum price filter",
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "collectionId",
              "required": false,
              "in": "query",
              "description": "Filter products by collection IDs",
              "schema": {
                "type": "array",
                "items": {
                  "type": "array",
                  "items": {
                    "type": "a"
                  }
                }
              }
            },
            {
              "name": "productType",
              "required": false,
              "in": "query",
              "description": "Filter products by types",
              "schema": {
                "type": "array",
                "items": {
                  "type": "array",
                  "items": {
                    "type": "a"
                  }
                }
              }
            },
            {
              "name": "sort",
              "required": false,
              "in": "query",
              "description": "Sort field",
              "schema": {
                "default": "createdAt",
                "enum": [
                  "createdAt",
                  "totalSoldUnits",
                  "name",
                  "price"
                ],
                "type": "string"
              }
            },
            {
              "name": "order",
              "required": false,
              "in": "query",
              "description": "Sort order: 1 for ascending, -1 for descending",
              "schema": {
                "default": -1,
                "enum": [
                  1,
                  -1
                ],
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "you can see a message that is product",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Product"
                  }
                }
              }
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/product/available/filters/{shopName}": {
        "get": {
          "operationId": "ProductController_getFilters",
          "summary": "Get available filters for shop products",
          "parameters": [
            {
              "name": "shopName",
              "required": true,
              "in": "path",
              "description": "Name of the shop to get filters for",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Returns available filters for products",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "collections": [
                        {
                          "title": "summer",
                          "count": 4
                        }
                      ],
                      "types": [
                        {
                          "label": "Physical Products",
                          "value": "NORMAL",
                          "count": 2
                        },
                        {
                          "label": "Digital Products",
                          "value": "DIGITAL",
                          "count": 8
                        }
                      ],
                      "price": {
                        "min": 1,
                        "max": 104
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/product/image/{productId}/{imageId}": {
        "delete": {
          "operationId": "ProductController_deleteImageFromProduct",
          "parameters": [
            {
              "name": "productId",
              "required": true,
              "in": "path",
              "example": "64f2e1d4a80f3547d0b3cac1",
              "description": "Product Id",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "imageId",
              "required": true,
              "in": "path",
              "example": "64f2e1d4a80f3547d0b3ca89",
              "description": "Id of the image to be deleted",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Product with updated media",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Product"
                  }
                }
              }
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/product/add/thumbnail/to/all/media": {
        "get": {
          "operationId": "ProductController_addThumbnail",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/product/public/categories/main": {
        "get": {
          "operationId": "ProductController_getMainCategories",
          "parameters": [
            {
              "name": "title",
              "required": false,
              "in": "query",
              "description": "clothing",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/product/public/categories/sub": {
        "get": {
          "operationId": "ProductController_getSubCategories",
          "parameters": [
            {
              "name": "title",
              "required": false,
              "in": "query",
              "description": "clothing",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/product/public/product/templates": {
        "get": {
          "operationId": "ProductController_getProductTemplates",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/product/quick/create/pod": {
        "post": {
          "operationId": "ProductController_quickCreateProduct",
          "summary": "Create New Product",
          "parameters": [
            {
              "name": "shop-id",
              "in": "header",
              "description": "65251c30541d42e5951a851c",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "x-api-key",
              "in": "header",
              "description": "X - Not required yet",
              "required": false,
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "description": "Create ",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/QuickCreatePodDTO"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "New Product",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Product"
                  }
                }
              }
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/product/community/view": {
        "get": {
          "operationId": "ProductController_getAffiliatedProducts",
          "parameters": [
            {
              "name": "page",
              "required": false,
              "in": "query",
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "title",
              "required": false,
              "in": "query",
              "description": "search by product title",
              "example": "shoes",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "categoryIds",
              "required": false,
              "in": "query",
              "description": "search by main category ids",
              "example": [
                "id",
                "id2",
                "..."
              ],
              "schema": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            },
            {
              "name": "subCategoryIds",
              "required": false,
              "in": "query",
              "description": "search by sub Category Ids",
              "example": [
                "id",
                "id2",
                "..."
              ],
              "schema": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            },
            {
              "name": "lowestPrice",
              "required": false,
              "in": "query",
              "description": "lowest price search",
              "example": 10,
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "highestPrice",
              "required": false,
              "in": "query",
              "description": "highest price search",
              "example": 20,
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "lowestCommission",
              "required": false,
              "in": "query",
              "description": "lowest commsion search",
              "example": 2,
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "highestCommision",
              "required": false,
              "in": "query",
              "description": "highest commision search",
              "example": 10,
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "sort",
              "required": false,
              "in": "query",
              "description": "sort - field name",
              "example": "createdAt",
              "schema": {
                "default": "createdAt",
                "enum": [
                  "createdAt"
                ],
                "type": "string"
              }
            },
            {
              "name": "order",
              "required": false,
              "in": "query",
              "description": "order",
              "example": "-1",
              "schema": {
                "default": "-1",
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/product/community/new": {
        "get": {
          "operationId": "ProductController_newAffilaiteProducts",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/product/community/public/view/{productInfo}": {
        "get": {
          "operationId": "ProductController_communityProductView",
          "parameters": [
            {
              "name": "productInfo",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "default": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Product"
                  }
                }
              }
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/product/community/view/hot": {
        "get": {
          "operationId": "ProductController_hotAffiliatedProducts",
          "parameters": [
            {
              "name": "range",
              "required": true,
              "in": "query",
              "schema": {
                "enum": [
                  "daily",
                  "weekly",
                  "monthly"
                ],
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/product/community/view/{productInfo}": {
        "get": {
          "operationId": "ProductController_communityPrivateView",
          "parameters": [
            {
              "name": "productInfo",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "default": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Product"
                  }
                }
              }
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/product/community/import": {
        "post": {
          "operationId": "ProductController_importProducts",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "example": {
                    "productId": "6463f7cfd06c1637910d43d5"
                  }
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/product/external/{id}": {
        "get": {
          "operationId": "ProductController_getSingleExternalProduct",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "example": "6463f7cfd06c1637910d43d5",
              "description": "product id",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "x-api-key",
              "in": "header",
              "description": "Shop API Key",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/product/reorder": {
        "post": {
          "operationId": "ProductController_reorderProducts",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "example": {
                    "productId": "id",
                    "newPosition": 2
                  }
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/product/add/order/to/old/products": {
        "get": {
          "operationId": "ProductController_newOrder",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/product/make/tile": {
        "post": {
          "operationId": "ProductController_createProductTile",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/createProductTileDTO"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "New Product tile",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ProductTile"
                  }
                }
              }
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/product/social/tile/{productId}": {
        "get": {
          "operationId": "ProductController_getSocialTile",
          "parameters": [
            {
              "name": "productId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/product/edit/tile/{productTileId}": {
        "patch": {
          "operationId": "ProductController_editProductTile",
          "parameters": [
            {
              "name": "productTileId",
              "required": true,
              "in": "path",
              "example": "6463f7cfd06c1637910d43d5",
              "description": "product tile id",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "example": {
                    "skuIDs": [
                      "new sku ids"
                    ]
                  }
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "New Product tile",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ProductTile"
                  }
                }
              }
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/product/tile/{productTileId}": {
        "get": {
          "operationId": "ProductController_getProductTile",
          "parameters": [
            {
              "name": "productTileId",
              "required": true,
              "in": "path",
              "example": "6463f7cfd06c1637910d43d5",
              "description": "product tile id",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "New Product tile",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ProductTile"
                  }
                }
              }
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "delete": {
          "operationId": "ProductController_removeTile",
          "parameters": [
            {
              "name": "productTileId",
              "required": true,
              "in": "path",
              "example": "6463f7cfd06c1637910d43d5",
              "description": "product tile id",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/product/duplicate": {
        "post": {
          "operationId": "ProductController_createDuplicateProduct",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateDuplicateProduct"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Duplicated Product",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Product"
                  }
                }
              }
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            },
            {
              "bearer": []
            }
          ]
        }
      },
      "/product/producttile/files/{id}/{type}": {
        "get": {
          "operationId": "ProductController_getTileFile",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "type",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "201": {
              "description": "Product tile files, js or css",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ProductTileFile"
                  }
                }
              }
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/product/query/slug": {
        "get": {
          "operationId": "ProductController_productsSlugQuery",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/product/add/shop/id": {
        "get": {
          "operationId": "ProductController_addShopId",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/product/producttile/files/update": {
        "put": {
          "operationId": "ProductController_updateTileFiles",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "example": {
                    "js": "js link",
                    "css": "css link"
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/product/link/{id}": {
        "get": {
          "operationId": "ProductController_getProductByLinkId",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Product and Shop data"
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/product/query/link": {
        "patch": {
          "operationId": "ProductController_queryProductLinks",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/product/activate/affiliate/selected/shops": {
        "get": {
          "operationId": "ProductController_activeAffiliate",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/product/printful-available-shipping": {
        "post": {
          "operationId": "ProductController_getAvailableShipping",
          "summary": "Get available shipping locations for a Printful product",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AvailableShippingRequestDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Returns an array of available shipping countries",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "example": "US"
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Invalid request payload"
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/product/update-vectors": {
        "post": {
          "operationId": "ProductController_updateVectors",
          "summary": "Update product vectors for semantic search",
          "description": "Updates vector embeddings for all published products. Required for semantic search functionality.",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Vectors updated successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/VectorUpdateResponseDto"
                  }
                }
              }
            },
            "500": {
              "description": "Failed to update vectors"
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/product/search/semantic": {
        "get": {
          "operationId": "ProductController_searchProducts",
          "summary": "Semantic product search",
          "description": "Search for products using natural language queries. Returns products ranked by relevance.",
          "parameters": [
            {
              "name": "query",
              "required": true,
              "in": "query",
              "description": "Search query string to find relevant products",
              "example": "blue cotton t-shirt",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "description": "Maximum number of results to return (1-100)",
              "example": 10,
              "schema": {
                "minimum": 1,
                "maximum": 100,
                "default": 10,
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Search completed successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/SearchProductResponseDto"
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Invalid input parameters"
            },
            "500": {
              "description": "Search failed"
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/product/import-csv": {
        "post": {
          "operationId": "ProductController_importProductsFromCSV",
          "summary": "Import products from CSV file",
          "parameters": [],
          "requestBody": {
            "required": true,
            "description": "CSV file to import",
            "content": {
              "multipart/form-data": {
                "schema": {
                  "type": "object",
                  "required": [
                    "file"
                  ],
                  "properties": {
                    "file": {
                      "type": "string",
                      "format": "binary",
                      "description": "CSV file containing product data"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Products imported successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      },
                      "imported": {
                        "type": "number"
                      },
                      "failed": {
                        "type": "number"
                      },
                      "results": {
                        "type": "object",
                        "properties": {
                          "total": {
                            "type": "number"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/product/process-templates/{userId}/{shopId}": {
        "post": {
          "operationId": "ProductController_processTemplateProducts",
          "parameters": [
            {
              "name": "userId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "shopId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProcessTemplateDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/product/crawler/website": {
        "post": {
          "operationId": "ProductController_addWebsiteForCrawling",
          "summary": "Add website for product extraction",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "websiteUrl": {
                      "type": "string",
                      "example": "https://example-store.com"
                    }
                  },
                  "required": [
                    "websiteUrl"
                  ]
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/product/crawler/preview-urls/{poolId}": {
        "get": {
          "operationId": "ProductController_getCrawlerPreviewUrls",
          "summary": "Get preview URLs for a website",
          "parameters": [
            {
              "name": "poolId",
              "required": true,
              "in": "path",
              "description": "Pool ID",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/product/crawler/selected-products": {
        "post": {
          "operationId": "ProductController_setSelectedProductsForCrawling",
          "summary": "Set selected product URLs for crawling",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "poolId": {
                      "type": "string"
                    },
                    "selectedUrls": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    }
                  },
                  "required": [
                    "poolId",
                    "selectedUrls"
                  ]
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/product/crawler/status/{poolId}": {
        "get": {
          "operationId": "ProductController_getCrawlerStatus",
          "summary": "Get processing status for a website",
          "parameters": [
            {
              "name": "poolId",
              "required": true,
              "in": "path",
              "description": "Pool ID",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/product/crawler/pools/shop": {
        "get": {
          "operationId": "ProductController_getCrawlerPoolsByShopId",
          "summary": "Get all crawler pools for a specific shop",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/product/crawler/tasks/recent": {
        "get": {
          "operationId": "ProductController_getRecentCrawlerTasks",
          "summary": "Get recent crawler tasks",
          "parameters": [
            {
              "name": "limit",
              "required": true,
              "in": "query",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/product/crawler/tasks/updates": {
        "get": {
          "operationId": "ProductController_getTaskUpdates",
          "summary": "Get task updates since timestamp",
          "parameters": [
            {
              "name": "since",
              "required": true,
              "in": "query",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/product/crawler/process-tasks": {
        "post": {
          "operationId": "ProductController_processCompletedTasks",
          "summary": "Manually trigger processing of completed tasks",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Products"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/collection": {
        "post": {
          "operationId": "CollectionController_createCollection",
          "summary": "create a new collection .",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateCollectionDTO"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "a message consists of created collection",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Collection"
                  }
                }
              }
            }
          },
          "tags": [
            "Collections"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "get": {
          "operationId": "CollectionController_getCollections",
          "summary": "get user's collections",
          "parameters": [],
          "responses": {
            "200": {
              "description": "a message consists of user's collections",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/Collection"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Collections"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/collection/{id}": {
        "get": {
          "operationId": "CollectionController_getCollectionByID",
          "summary": "get collection by id",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "example": "6332a65d26038728b5aa9e43",
              "description": "collection id",
              "schema": {}
            }
          ],
          "responses": {
            "200": {
              "description": "a message consists of requested collection",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Collection"
                  }
                }
              }
            }
          },
          "tags": [
            "Collections"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "put": {
          "operationId": "CollectionController_updateCollection",
          "summary": "update collection by id",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "example": "6332a65d26038728b5aa9e43",
              "description": "collection id",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/updateCollectionDTO"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "a message consists of updated collection",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Collection"
                  }
                }
              }
            }
          },
          "tags": [
            "Collections"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "delete": {
          "operationId": "CollectionController_deleteCollection",
          "summary": "delete collection by id",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "example": "6332a65d26038728b5aa9e43",
              "description": "collection id",
              "schema": {}
            }
          ],
          "responses": {
            "200": {
              "description": "a message consists of deleted collection",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Collection"
                  }
                }
              }
            }
          },
          "tags": [
            "Collections"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "post": {
          "operationId": "CollectionController_addProductToCollection",
          "summary": "add product to collection",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "example": "6332a65d26038728b5aa9e43",
              "description": "collection id",
              "schema": {}
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/addProductToCollection"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "a message consists of product added to collection",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Collection"
                  }
                }
              }
            }
          },
          "tags": [
            "Collections"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/collection/public/collection/{id}": {
        "get": {
          "operationId": "CollectionController_getCollection",
          "summary": "get collection by id - public",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "example": "6332a65d26038728b5aa9e43",
              "description": "collection id",
              "schema": {}
            }
          ],
          "responses": {
            "200": {
              "description": "a message consists of requested collection",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Collection"
                  }
                }
              }
            }
          },
          "tags": [
            "Collections"
          ]
        }
      },
      "/collection/public/{shopName}": {
        "get": {
          "operationId": "CollectionController_getCollectionByShopName",
          "summary": "get collections by shop name - public",
          "parameters": [
            {
              "name": "shopName",
              "required": true,
              "in": "path",
              "example": "cyberpunk",
              "description": "shop name",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "a message consists of shop's collections",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/Collection"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Collections"
          ]
        }
      },
      "/collection/add/shop/id": {
        "get": {
          "operationId": "CollectionController_addShopId",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Collections"
          ]
        }
      },
      "/collection/list/minimal": {
        "get": {
          "operationId": "CollectionController_getCollectionsListsMinimal",
          "summary": "Shop Collection List",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Get a list of shop's collections",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/Collection"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Collections"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/collection/reorder": {
        "patch": {
          "operationId": "CollectionController_reorderCollections",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "example": {
                    "collectionId": "id",
                    "newPosition": 2
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Collections"
          ]
        }
      },
      "/collection/add/order/to/old/collections": {
        "get": {
          "operationId": "CollectionController_addOrderToCollections",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Collections"
          ]
        }
      },
      "/sku/record/supported-chains": {
        "get": {
          "operationId": "SkuController_getSupportedChains",
          "summary": "Returns list of supported chains for recording sku .",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "sku"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/sku/record/{chain}": {
        "post": {
          "operationId": "SkuController_skuRecord",
          "parameters": [
            {
              "name": "chain",
              "required": true,
              "in": "path",
              "description": "specify the chain that the sku will be recorded on",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/RecordSKUDTO"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "you can see a message that the data added to queue successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "string"
                  }
                }
              }
            }
          },
          "tags": [
            "sku"
          ],
          "security": [
            {
              "bearer": []
            },
            {
              "bearer": []
            }
          ]
        }
      },
      "/sku/record-all/{chain}": {
        "post": {
          "operationId": "SkuController_recordAll",
          "parameters": [
            {
              "name": "chain",
              "required": true,
              "in": "path",
              "description": "specify the chain that the sku will be recorded on",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/RecordAllSKUDTO"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "you can see a message that the data added to queue successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "string"
                  }
                }
              }
            }
          },
          "tags": [
            "sku"
          ],
          "security": [
            {
              "bearer": []
            },
            {
              "bearer": []
            }
          ]
        }
      },
      "/sku/{id}": {
        "put": {
          "operationId": "SkuController_updateSkuByID",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/updateSkuDTO"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "sku"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "delete": {
          "operationId": "SkuController_removeSku",
          "summary": "remove single sku",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "example": "62acaca3cf66d8c0b581b69d",
              "description": "sku id",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "returns true if succeeds"
            }
          },
          "tags": [
            "sku"
          ],
          "security": [
            {
              "bearer": []
            },
            {
              "bearer": []
            }
          ]
        },
        "get": {
          "operationId": "SkuController_getSku",
          "summary": "Show single sku",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "example": "62acaca3cf66d8c0b581b69d",
              "description": "sku id",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Sku"
                  }
                }
              }
            }
          },
          "tags": [
            "sku"
          ],
          "security": [
            {
              "bearer": []
            },
            {
              "bearer": []
            }
          ]
        }
      },
      "/sku/{id}/option/{optionID}": {
        "put": {
          "operationId": "SkuController_updateOptionsOfSkus",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "optionID",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/updateOptionsOfSkusDTO"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "sku"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/sku": {
        "delete": {
          "operationId": "SkuController_removeSkus",
          "summary": "removes multiple skus",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "example": {
                    "id": [
                      "62acaca3cf66d8c0b581b69d",
                      "62acaca3cf66d8c0b581b69d"
                    ]
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "returns true if succeeds"
            }
          },
          "tags": [
            "sku"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/sku/add/shop/id": {
        "get": {
          "operationId": "SkuController_addShopId",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "sku"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/sku/metadata/{skuId}": {
        "patch": {
          "operationId": "SkuController_setSkuMetadata",
          "parameters": [
            {
              "name": "skuId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SkuMetadataDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Attach metadata and Create url for sku",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "string"
                  }
                }
              }
            }
          },
          "tags": [
            "sku"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/sku/{skuId}/metadata": {
        "get": {
          "operationId": "SkuController_getSkuMetadataUrl",
          "parameters": [
            {
              "name": "skuId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Get sku metadata url"
            }
          },
          "tags": [
            "sku"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/sku/record/circle/{chain}": {
        "post": {
          "operationId": "SkuController_skuCircleRecord",
          "parameters": [
            {
              "name": "chain",
              "required": true,
              "in": "path",
              "description": "specify the chain that the sku will be recorded on",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/RecordCircleSkuDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "sku"
          ],
          "security": [
            {
              "bearer": []
            },
            {
              "bearer": []
            }
          ]
        }
      },
      "/sku/record-all/circle/{chain}": {
        "post": {
          "operationId": "SkuController_recordCircleAll",
          "parameters": [
            {
              "name": "chain",
              "required": true,
              "in": "path",
              "description": "specify the chain that the sku will be recorded on",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/RecordCircleAllSkuDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "you can see a message that the data added to queue successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "string"
                  }
                }
              }
            }
          },
          "tags": [
            "sku"
          ],
          "security": [
            {
              "bearer": []
            },
            {
              "bearer": []
            }
          ]
        }
      },
      "/variant/custom": {
        "post": {
          "operationId": "VariantController_createCustom",
          "parameters": [],
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "variant"
          ]
        }
      },
      "/variant": {
        "get": {
          "operationId": "VariantController_getVariants",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "variant"
          ]
        }
      },
      "/variant/{id}": {
        "get": {
          "operationId": "VariantController_getVariant",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "variant"
          ]
        }
      },
      "/currency/rate": {
        "get": {
          "operationId": "CurrencyController_getCurrencyRate",
          "summary": "Get currency rate for a country",
          "parameters": [
            {
              "name": "country",
              "required": true,
              "in": "query",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Returns currency rate information"
            }
          },
          "tags": [
            "Currency"
          ]
        }
      },
      "/currency/country": {
        "get": {
          "operationId": "CurrencyController_getCountryFromIp",
          "summary": "Get country from IP",
          "parameters": [
            {
              "name": "ip",
              "required": true,
              "in": "query",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Returns country code"
            }
          },
          "tags": [
            "Currency"
          ]
        }
      },
      "/cart/v2": {
        "post": {
          "operationId": "CartController_addProductToCartV2",
          "summary": "Add Product to Cart V2",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/createCartDTO"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Updated Cart with New Product And new Property groupedItems",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Cart"
                  }
                }
              }
            }
          },
          "tags": [
            "carts"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "get": {
          "operationId": "CartController_getCartV2",
          "summary": "Get User Cart v2",
          "parameters": [],
          "responses": {
            "200": {
              "description": "a message consists of user's cart",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Cart"
                  }
                }
              }
            }
          },
          "tags": [
            "carts"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/cart/v2/{id}": {
        "patch": {
          "operationId": "CartController_updateProductQuantityForCartV2",
          "summary": "Update product quantity in the cart v2",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "example": "6332a65d26038728b5aa9e43",
              "description": "Sku Id",
              "schema": {}
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/updateCartDTO"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "a message consists of updated cart",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Cart"
                  }
                }
              }
            }
          },
          "tags": [
            "carts"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/cart/v2/{itemId}": {
        "delete": {
          "operationId": "CartController_deleteProductFromCartV2",
          "summary": "Delete Product from Cart v2",
          "parameters": [
            {
              "name": "itemId",
              "required": true,
              "in": "path",
              "example": "6332a65d26038728b5aa9e43",
              "description": "Items Id",
              "schema": {}
            }
          ],
          "responses": {
            "200": {
              "description": "a message consists of deletion result"
            }
          },
          "tags": [
            "carts"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/cart": {
        "delete": {
          "operationId": "CartController_deleteCart",
          "summary": "delete user's cart",
          "parameters": [],
          "responses": {
            "200": {
              "description": "a message consists of deleted cart",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Cart"
                  }
                }
              }
            }
          },
          "tags": [
            "carts"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/cart/public/anonymous-cart": {
        "post": {
          "operationId": "CartController_createAnonymousCart",
          "summary": "Create anonymous cart .",
          "parameters": [],
          "responses": {
            "201": {
              "description": "A message consist of created cart .",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Cart"
                  }
                }
              }
            }
          },
          "tags": [
            "carts"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/cart/v2/public/anonymous-cart/{cartID}": {
        "get": {
          "operationId": "CartController_getAnonymousCartV2",
          "summary": "Get Anonymous Cart V2",
          "parameters": [
            {
              "name": "cartID",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "isInvoice",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "A message consisting of the cart.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Cart"
                  }
                }
              }
            }
          },
          "tags": [
            "carts"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "post": {
          "operationId": "CartController_addProductToAnonymousCartBasedOnVas",
          "summary": "Add product to cart .",
          "parameters": [
            {
              "name": "cartID",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/createCartDTO"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "A message consist of cart and added product .",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Cart"
                  }
                }
              }
            }
          },
          "tags": [
            "carts"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "patch": {
          "operationId": "CartController_updateProductQuantityForAnonymousCartV2",
          "summary": "Update product quantity in the cart v2",
          "parameters": [
            {
              "name": "cartID",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateProductQuantityDTO"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "A message consist of cart and updated quantities .",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Cart"
                  }
                }
              }
            }
          },
          "tags": [
            "carts"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "delete": {
          "operationId": "CartController_deleteProductFromAnonymousCartV2",
          "summary": "Delete product from the cart .",
          "parameters": [
            {
              "name": "cartID",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DeleteProductDTO"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "A message consist of modified cart ."
            }
          },
          "tags": [
            "carts"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/cart/public/{cartId}": {
        "delete": {
          "operationId": "CartController_deleteAnonymousCart",
          "summary": "Delete Anonymous Cart",
          "parameters": [
            {
              "name": "cartId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "a message consists of deleted cart",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Cart"
                  }
                }
              }
            }
          },
          "tags": [
            "carts"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/cart/add/preview/item/{cartId}/{itemId}": {
        "post": {
          "operationId": "CartController_addPreviewItem",
          "parameters": [
            {
              "name": "cartId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "itemId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateCartM2MPreview"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "carts"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/cart/refactor/cart/calculate/vas/{cartId}": {
        "get": {
          "operationId": "CartController_calculateCartUsingVas",
          "parameters": [
            {
              "name": "cartId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "carts"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/cart/email": {
        "patch": {
          "operationId": "CartController_addEmailToUserCart",
          "summary": "Add an email to authenticated user cart",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AddEmailToUserCartDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "A message consist of cart and updated email."
            }
          },
          "tags": [
            "carts"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/cart/public/anonymous-cart/email/{cartID}": {
        "patch": {
          "operationId": "CartController_addEmailToAnoymousCart",
          "summary": "Add an email to anonymous/guest cart",
          "parameters": [
            {
              "name": "cartID",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AddEmailToAnoymousCartDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "A message consist of cart and updated quantities.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Cart"
                  }
                }
              }
            }
          },
          "tags": [
            "carts"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/cart/producer/invoices": {
        "post": {
          "operationId": "CartController_createCartAsInvoice",
          "summary": "Create Cart as Invoice by Producer",
          "parameters": [],
          "responses": {
            "201": {
              "description": "Created Cart Data",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Cart"
                  }
                }
              }
            }
          },
          "tags": [
            "carts"
          ],
          "security": [
            {
              "bearer": []
            },
            {
              "bearer": []
            }
          ]
        },
        "get": {
          "operationId": "CartController_getCartsAsInvoice",
          "summary": "Get Cart list as Invoice by Producer",
          "parameters": [
            {
              "name": "page",
              "required": false,
              "in": "query",
              "description": "Page number",
              "example": 1,
              "schema": {
                "default": 1,
                "type": "string"
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "description": "Number of items per page",
              "example": 10,
              "schema": {
                "default": 10,
                "type": "string"
              }
            },
            {
              "name": "order",
              "required": false,
              "in": "query",
              "description": "order direction",
              "example": "desc",
              "schema": {
                "default": "desc",
                "enum": [
                  "desc",
                  "asc"
                ],
                "type": "string"
              }
            },
            {
              "name": "sort",
              "required": false,
              "in": "query",
              "description": "sort - field name",
              "example": "createdAt",
              "schema": {
                "default": "createdAt",
                "enum": [
                  "createdAt"
                ],
                "type": "string"
              }
            },
            {
              "name": "search",
              "required": false,
              "in": "query",
              "example": "iman",
              "description": "search term",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "from",
              "required": false,
              "in": "query",
              "example": "2023-11-27T00:00:00.000Z",
              "description": "date filter - from",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            },
            {
              "name": "to",
              "required": false,
              "in": "query",
              "example": "2023-11-27T23:59:59.999Z",
              "description": "date filter - to",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            },
            {
              "name": "status",
              "required": false,
              "in": "query",
              "description": "Status of the invoice",
              "example": "ACTIVE",
              "schema": {
                "enum": [
                  "ACTIVE",
                  "CHECKED_OUT",
                  "PENDING"
                ],
                "type": "string"
              }
            }
          ],
          "responses": {
            "201": {
              "description": "Cart Data",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/Cart"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "carts"
          ],
          "security": [
            {
              "bearer": []
            },
            {
              "bearer": []
            }
          ]
        }
      },
      "/cart/producer/invoices/{cartId}/products": {
        "post": {
          "operationId": "CartController_addProductToInvoiceCart",
          "summary": "Add products to invoice cart",
          "parameters": [
            {
              "name": "cartId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AddProductsToInvoiceCartDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Updated Cart Products/Items",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Cart"
                  }
                }
              }
            }
          },
          "tags": [
            "carts"
          ],
          "security": [
            {
              "bearer": []
            },
            {
              "bearer": []
            }
          ]
        }
      },
      "/cart/producer/invoices/{cartId}": {
        "delete": {
          "operationId": "CartController_deleteCartsAsInvoice",
          "summary": "Delete an active (non-used) Invoice",
          "parameters": [
            {
              "name": "cartId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "carts"
          ],
          "security": [
            {
              "bearer": []
            },
            {
              "bearer": []
            }
          ]
        }
      },
      "/cart/v2/public/payment-methods/{cartId}": {
        "get": {
          "operationId": "CartController_getCartPaymentMethods",
          "summary": "Get serialized payment methods for cart",
          "parameters": [
            {
              "name": "cartId",
              "required": true,
              "in": "path",
              "description": "Cart ID",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Returns serialized payment methods for the cart",
              "example": [
                {
                  "type": "STRIPE",
                  "label": "Pay with USD",
                  "stripeType": "SHOPCURRENCY"
                },
                {
                  "type": "STRIPE",
                  "label": "Pay with CHF",
                  "stripeType": "LOCALCURRENCY"
                },
                {
                  "type": "COINBASE",
                  "label": "Pay with COINBASE"
                },
                {
                  "type": "BINANCE",
                  "token": "USDC",
                  "isCustom": false,
                  "icon": "",
                  "chainId": "662a2ea36cce2d95a0eeccda",
                  "label": "Pay with BINANCE"
                },
                {
                  "type": "BINANCE",
                  "token": "BNB",
                  "isCustom": false,
                  "icon": "",
                  "chainId": "662a2ea36cce2d95a0eeccda",
                  "label": "Pay with BINANCE"
                },
                {
                  "type": "SKALE",
                  "token": "USDC",
                  "isCustom": false,
                  "icon": "",
                  "chainId": "66c2fbc5eb3fe55fbe27ffd7",
                  "label": "Pay with SKALE"
                },
                {
                  "type": "BITLAYER",
                  "token": "USDC",
                  "isCustom": false,
                  "icon": "",
                  "chainId": "6763a37f3d035adf9da3ec16",
                  "label": "Pay with BITLAYER"
                },
                {
                  "type": "POLYGON",
                  "token": "USDC",
                  "isCustom": false,
                  "icon": "",
                  "chainId": "662a2ea36cce2d95a0eeccd9",
                  "label": "Pay with POLYGON"
                }
              ],
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/CartPaymentMethod"
                    }
                  },
                  "example": [
                    {
                      "type": "STRIPE",
                      "label": "Pay with USD",
                      "stripeType": "SHOPCURRENCY"
                    },
                    {
                      "type": "STRIPE",
                      "label": "Pay with CHF",
                      "stripeType": "LOCALCURRENCY"
                    },
                    {
                      "type": "COINBASE",
                      "label": "Pay with COINBASE"
                    },
                    {
                      "type": "BINANCE",
                      "token": "USDC",
                      "isCustom": false,
                      "icon": "",
                      "chainId": "662a2ea36cce2d95a0eeccda",
                      "label": "Pay with BINANCE"
                    },
                    {
                      "type": "BINANCE",
                      "token": "BNB",
                      "isCustom": false,
                      "icon": "",
                      "chainId": "662a2ea36cce2d95a0eeccda",
                      "label": "Pay with BINANCE"
                    },
                    {
                      "type": "SKALE",
                      "token": "USDC",
                      "isCustom": false,
                      "icon": "",
                      "chainId": "66c2fbc5eb3fe55fbe27ffd7",
                      "label": "Pay with SKALE"
                    },
                    {
                      "type": "BITLAYER",
                      "token": "USDC",
                      "isCustom": false,
                      "icon": "",
                      "chainId": "6763a37f3d035adf9da3ec16",
                      "label": "Pay with BITLAYER"
                    },
                    {
                      "type": "POLYGON",
                      "token": "USDC",
                      "isCustom": false,
                      "icon": "",
                      "chainId": "662a2ea36cce2d95a0eeccd9",
                      "label": "Pay with POLYGON"
                    }
                  ]
                }
              }
            }
          },
          "tags": [
            "carts"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/cart/additional-details": {
        "patch": {
          "operationId": "CartController_attachAdditionalDetails",
          "summary": "Attach additional details to cart",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AttachAdditionalDetailsDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "carts"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/cart/v2/public/anonymous-cart/{cartId}/additional-details": {
        "patch": {
          "operationId": "CartController_attachAdditionalDetailsAnon",
          "summary": "Attach additional details to an anonymous cart/order",
          "description": "This endpoint allows you to attach additional details like address, email, and notes to an anonymous cart/order. It is used for updating cart details before proceeding with checkout.",
          "parameters": [
            {
              "name": "cartId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AttachAdditionalDetailsDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "The cart details have been successfully updated with the additional information."
            },
            "400": {
              "description": "Bad Request. Invalid input data or cart ID."
            },
            "404": {
              "description": "Cart not found with the provided cartId."
            }
          },
          "tags": [
            "carts"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/cart/v2/public/anonymous-cart/shipping-rate/{cartId}": {
        "post": {
          "operationId": "CartController_addShippingRateToAnonymous",
          "summary": "Add shipping rate to Cart",
          "description": "Add a selected shipping rate to the anonymous cart based on the Value-Added Services (VAS) associated with the cart.",
          "parameters": [
            {
              "name": "cartId",
              "required": true,
              "in": "path",
              "description": "The ID of the cart to which the shipping rate will be added.",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SelectShippingRateVas"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "The cart with the updated shipping rate has been successfully applied.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "cartId": {
                        "type": "string",
                        "description": "ID of the cart"
                      },
                      "updatedShippingRate": {
                        "type": "object",
                        "properties": {
                          "shippingMethodId": {
                            "type": "string",
                            "description": "ID of the selected shipping method"
                          },
                          "rate": {
                            "type": "number",
                            "example": 20.5,
                            "description": "The shipping rate"
                          },
                          "deliveryTime": {
                            "type": "string",
                            "example": "2-3 business days",
                            "description": "Estimated delivery time"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Invalid input or missing cart ID."
            },
            "404": {
              "description": "Cart not found or unable to apply shipping rate."
            }
          },
          "tags": [
            "carts"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/cart/v2/shippingrate": {
        "post": {
          "operationId": "CartController_setShippingRateToCartV2",
          "summary": "Add shipping rate to the cart",
          "description": "Adds a selected shipping rate to the cart based on the chosen shipping method and group ID.",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SelectShippingRateVas"
                }
              }
            }
          },
          "responses": {
            "400": {
              "description": "Bad request. Invalid input or missing fields."
            },
            "401": {
              "description": "Unauthorized. Invalid JWT token."
            },
            "404": {
              "description": "Cart not found or unable to apply shipping rate."
            }
          },
          "tags": [
            "carts"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/rule-set/v2": {
        "post": {
          "operationId": "RuleSetController_createRuleSetV2",
          "summary": "Create a new RuleSet V2",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateRuleSetV2DTO"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Created RuleSet V2"
            }
          },
          "tags": [
            "RuleSets"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "get": {
          "operationId": "RuleSetController_getRuleSetsV",
          "summary": "Get RuleSets for a shop",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Returns list of RuleSets",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/RuleSetV2"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "RuleSets"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/rule-set/v2/{rulesetId}": {
        "get": {
          "operationId": "RuleSetController_getRuleSetById",
          "summary": "Get single RuleSet by ID",
          "parameters": [
            {
              "name": "rulesetId",
              "required": true,
              "in": "path",
              "description": "RuleSet ID",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Returns a RuleSet",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/RuleSetV2"
                  }
                }
              }
            }
          },
          "tags": [
            "RuleSets"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "patch": {
          "operationId": "RuleSetController_updateRuleSetV2",
          "summary": "Update RuleSet",
          "parameters": [
            {
              "name": "rulesetId",
              "required": true,
              "in": "path",
              "description": "RuleSet ID",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateRuleSetV2DTO"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "RuleSet updated successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/RuleSetV2"
                  }
                }
              }
            }
          },
          "tags": [
            "RuleSets"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "delete": {
          "operationId": "RuleSetController_deleteRuleSetV2",
          "summary": "Delete RuleSet",
          "parameters": [
            {
              "name": "rulesetId",
              "required": true,
              "in": "path",
              "description": "RuleSet ID",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "RuleSet deleted successfully"
            }
          },
          "tags": [
            "RuleSets"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/rule-set/v2/check-ruleset": {
        "post": {
          "operationId": "RuleSetController_checkRuleSet",
          "summary": "Check if a RuleSet is passed",
          "parameters": [],
          "requestBody": {
            "required": true,
            "description": "Payload containing the RuleSet ID and Wallet Address",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "rulesetId": {
                      "type": "string",
                      "description": "ID of the RuleSet to be checked",
                      "example": "6332a65d26038728b5aa9e43"
                    },
                    "walletAddress": {
                      "type": "string",
                      "description": "Wallet address to check against the RuleSet",
                      "example": "0x1234567890abcdef"
                    }
                  },
                  "required": [
                    "rulesetId",
                    "walletAddress"
                  ]
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Returns true if the RuleSet is passed, false otherwise",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "passed": true
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Invalid input: Missing rulesetId or walletAddress",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "statusCode": 400,
                      "message": "Both rulesetId and walletAddress are required"
                    }
                  }
                }
              }
            },
            "404": {
              "description": "RuleSet not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "statusCode": 404,
                      "message": "RuleSet not found"
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Internal server error",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "statusCode": 500,
                      "message": "Failed to check RuleSet"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "RuleSets"
          ]
        }
      },
      "/rule-set/v2/public/available": {
        "get": {
          "operationId": "RuleSetController_getAvailableRuleSets",
          "summary": "Get available RuleSets and Networks",
          "parameters": [],
          "responses": {
            "200": {
              "description": "List of RuleSet types and networks",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "ruleSetTypes": [
                        "GATING",
                        "DISCOUNT"
                      ],
                      "networks": [
                        {
                          "chain": "POLYGON",
                          "name": "Polygon"
                        },
                        {
                          "chain": "LINEA",
                          "name": "Linea"
                        },
                        {
                          "chain": "BINANCE",
                          "name": "Binance"
                        }
                      ]
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "RuleSets"
          ]
        }
      },
      "/rule-set/v2/public/{rulesetId}": {
        "get": {
          "operationId": "RuleSetController_getPublicRuleSetById",
          "summary": "Get public RuleSet details by ID",
          "parameters": [
            {
              "name": "rulesetId",
              "required": true,
              "in": "path",
              "description": "RuleSet ID",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Returns RuleSet details",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/RuleSetV2"
                  }
                }
              }
            }
          },
          "tags": [
            "RuleSets"
          ]
        }
      },
      "/rule-set/nft-images": {
        "post": {
          "operationId": "RuleSetController_fetchNFTs",
          "summary": "Fetch NFTs for a wallet",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/FetchNFTDTO"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Successfully retrieved NFTs",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "nfts": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        }
                      },
                      "domains": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "RuleSets"
          ]
        }
      },
      "/rule-set/add/shop/id": {
        "get": {
          "operationId": "RuleSetController_addShopId",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "RuleSets"
          ]
        }
      },
      "/rule-set/preview": {
        "post": {
          "operationId": "RuleSetController_generatePreview",
          "summary": "Generate a preview image",
          "parameters": [],
          "requestBody": {
            "required": true,
            "description": "Request payload for generating a preview image",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/PreviewRequestDTO"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Preview image successfully generated.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "image": {
                        "type": "string",
                        "example": "base64_encoded_image_string"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Invalid request payload."
            },
            "500": {
              "description": "Internal server error."
            }
          },
          "tags": [
            "RuleSets"
          ]
        }
      },
      "/checkout/v2/add-address": {
        "post": {
          "operationId": "CheckoutController_addAddressV2",
          "summary": "Add address book to anonymous cart .",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AddAddressDTO"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "A message that says address book has been added to cart successfully ."
            }
          },
          "tags": [
            "checkouts"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/checkout/anon/{cartId}/additional-details": {
        "patch": {
          "operationId": "CheckoutController_attachAdditionalDetailsAnon",
          "summary": "Attach additional details to anonymous cart/order",
          "parameters": [
            {
              "name": "cartId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AttachAdditionalDetailsDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "checkouts"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/checkout": {
        "post": {
          "operationId": "CheckoutController_createCheckout",
          "summary": "create checkout",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/createCheckoutDTO"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "a message consists of checkout description"
            }
          },
          "tags": [
            "checkouts"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/checkout/public/anonymous-cart/{cartID}": {
        "post": {
          "operationId": "CheckoutController_createCheckoutForAnonymousCart",
          "summary": "create checkout",
          "parameters": [
            {
              "name": "cartID",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AnonymousCartCheckoutDTO"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "a message consists of checkout description"
            }
          },
          "tags": [
            "checkouts"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/checkout/v2/stripe": {
        "post": {
          "operationId": "CheckoutController_initializeStripeCheckout",
          "summary": "Initialize Order and Create Stripe Secret",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "type": {
                      "type": "string",
                      "enum": [
                        "stripe",
                        "paymob"
                      ],
                      "example": "stripe",
                      "description": "Payment type"
                    }
                  },
                  "required": [
                    "type"
                  ]
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "a message consists of checkout description"
            }
          },
          "tags": [
            "checkouts"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/checkout/v2/stripe/local": {
        "post": {
          "operationId": "CheckoutController_initializeStripeCheckoutLocal",
          "summary": "Initialize Order and Create Stripe Secret",
          "parameters": [],
          "responses": {
            "201": {
              "description": "a message consists of checkout description"
            }
          },
          "tags": [
            "checkouts"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/checkout/v2/coinbase": {
        "post": {
          "operationId": "CheckoutController_initializeCoinbaseCheckout",
          "summary": "Initialize Order and Create Coinbase Url",
          "parameters": [],
          "responses": {
            "201": {
              "description": "a message consists of checkout description"
            }
          },
          "tags": [
            "checkouts"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/checkout/v2/payment/{paymentType}/{tokenType}": {
        "post": {
          "operationId": "CheckoutController_createCheckoutChainV2",
          "summary": "Create checkout based on chain param v2",
          "parameters": [
            {
              "name": "paymentType",
              "required": true,
              "in": "path",
              "schema": {
                "enum": [
                  "CASPER",
                  "POLYGON",
                  "BINANCE",
                  "REDBELLY",
                  "BITLAYER",
                  "ETH",
                  "STACKS",
                  "XRPLSIDECHAIN",
                  "NEAR",
                  "SKALE",
                  "BASE",
                  "LINEA",
                  "SOLANA"
                ],
                "type": "string"
              }
            },
            {
              "name": "tokenType",
              "required": true,
              "in": "path",
              "schema": {
                "enum": [
                  "USDT",
                  "USDC",
                  "BINANCE_PEG_BSC_USD",
                  "CSPR",
                  "MATIC",
                  "BNB",
                  "XRP",
                  "BASE",
                  "LINEA",
                  "ETH",
                  "MEW",
                  "PARAM",
                  "SOL",
                  "PARAMT",
                  "PARAMB",
                  "BDC",
                  "RBNT",
                  "BTC"
                ],
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CartCryptoCheckoutDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "a message consists of checkout description"
            }
          },
          "tags": [
            "checkouts"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/checkout/v2/shippingrate": {
        "post": {
          "operationId": "CheckoutController_setShippingRateToCartV2",
          "summary": "add shipping rate to cart",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SelectShippingRateVas"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "a message consists of updated cart"
            }
          },
          "tags": [
            "checkouts"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/checkout/v2/public/anonymous-cart/{cartID}/stripe": {
        "post": {
          "operationId": "CheckoutController_initializeStripePublicCheckout",
          "summary": "Initialize Order and Create Stripe Secret - Public (Anonymous User)",
          "description": "Creates an order and generates Stripe secret key for anonymous users to process payment",
          "parameters": [
            {
              "name": "cartID",
              "required": true,
              "in": "path",
              "description": "Anonymous cart identifier",
              "example": "507f1f77bcf86cd799439011",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "description": "Checkout details for anonymous cart",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AnonymousCartCasperCheckoutDTO"
                },
                "examples": {
                  "default": {
                    "value": {
                      "email": "customer@example.com",
                      "type": "stripe"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Successfully created order and returned Stripe secret key",
              "content": {
                "application/json": {
                  "schema": {
                    "properties": {
                      "clientSecret": {
                        "type": "string",
                        "example": "pi_3NqLZs2eZvKYlo2C1bTjUgx_secret_MKChz9t0u4"
                      },
                      "orderId": {
                        "type": "string",
                        "example": "507f1f77bcf86cd799439011"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Invalid input parameters"
            },
            "404": {
              "description": "Cart not found"
            }
          },
          "tags": [
            "checkouts"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/checkout/v2/public/anonymous-cart/{cartID}/stripe/local": {
        "post": {
          "operationId": "CheckoutController_initializeStripePublicCheckoutLocal",
          "summary": "Initialize Order and Create Stripe Secret - Public (Anonymous User)",
          "parameters": [
            {
              "name": "cartID",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AnonymousCartCasperCheckoutDTO"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "a message consists of checkout description"
            }
          },
          "tags": [
            "checkouts"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/checkout/v2/public/anonymous-cart/{cartID}/coinbase": {
        "post": {
          "operationId": "CheckoutController_initializeCoinbasePublicCheckout",
          "summary": "Initialize Order and Create Coinbase Payment Url - Public (Anonymous User)",
          "parameters": [
            {
              "name": "cartID",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AnonymousCartCasperCheckoutDTO"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "a message consists of checkout description"
            }
          },
          "tags": [
            "checkouts"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/checkout/v2/paymob": {
        "post": {
          "operationId": "CheckoutController_initializePaymob",
          "summary": "Initialize Order and Create Paymob Secret",
          "parameters": [],
          "responses": {
            "201": {
              "description": "a message consists of checkout description"
            }
          },
          "tags": [
            "checkouts"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/checkout/v2/public/anonymous-cart/{cartID}/paymob": {
        "post": {
          "operationId": "CheckoutController_initializePaymobPublicCheckout",
          "summary": "Initialize Order and Create Paymob Secret - Public (Anonymous User)",
          "parameters": [
            {
              "name": "cartID",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AnonymousCartCasperCheckoutDTO"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "a message consists of checkout description"
            }
          },
          "tags": [
            "checkouts"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/checkout/v2/public/anonymous-cart/{cartID}/payment/{paymentType}/{tokenType}": {
        "post": {
          "operationId": "CheckoutController_createCheckoutChainAnonymousV2",
          "summary": "Create Guest Checkout based on Chain",
          "parameters": [
            {
              "name": "cartID",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "paymentType",
              "required": true,
              "in": "path",
              "schema": {
                "enum": [
                  "CASPER",
                  "POLYGON",
                  "BINANCE",
                  "REDBELLY",
                  "BITLAYER",
                  "ETH",
                  "STACKS",
                  "XRPLSIDECHAIN",
                  "NEAR",
                  "SKALE",
                  "BASE",
                  "LINEA",
                  "SOLANA"
                ],
                "type": "string"
              }
            },
            {
              "name": "tokenType",
              "required": true,
              "in": "path",
              "schema": {
                "enum": [
                  "USDT",
                  "USDC",
                  "BINANCE_PEG_BSC_USD",
                  "CSPR",
                  "MATIC",
                  "BNB",
                  "XRP",
                  "BASE",
                  "LINEA",
                  "ETH",
                  "MEW",
                  "PARAM",
                  "SOL",
                  "PARAMT",
                  "PARAMB",
                  "BDC",
                  "RBNT",
                  "BTC"
                ],
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AnonymousCartCryptoCheckoutDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "a message consists of checkout description"
            }
          },
          "tags": [
            "checkouts"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/checkout/v2/public/anonymous-cart/{cartID}/address": {
        "post": {
          "operationId": "CheckoutController_addAddressBookToAnonymousCartV2",
          "summary": "Add address book to anonymous cart .",
          "parameters": [
            {
              "name": "cartID",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AddAddressDTO"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "A message that says address book has been added to cart successfully ."
            }
          },
          "tags": [
            "checkouts"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/checkout/v2/public/anonymous-cart/{cartId}/shipping-rate": {
        "post": {
          "operationId": "CheckoutController_addShippingRateToAnonymousCartBasedOnVas",
          "summary": "Add shipping rate to Cart",
          "parameters": [
            {
              "name": "cartId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SelectShippingRateVas"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Will return updated cart with selected shipment rate"
            }
          },
          "tags": [
            "checkouts"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/checkout/order/cancel/payment": {
        "delete": {
          "operationId": "CheckoutController_cancelOrderPayment",
          "summary": "Cancel an order payment",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "checkouts"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/checkout/anonymous/order/cancel/payment": {
        "delete": {
          "operationId": "CheckoutController_cancelOrderPaymentAnonymous",
          "summary": "Cancel an order payment (Non-Authenticated User)",
          "parameters": [
            {
              "name": "cartId",
              "required": true,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "paymentIntent",
              "required": false,
              "in": "query",
              "description": "Should be provided on stripe scenario",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "checkouts"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/checkout/order/crypto-payment-data/{cartId}/{tokenType}/{paymentType}/{walletAddress}": {
        "get": {
          "operationId": "CheckoutController_paymentCheckoutV2WithCartId",
          "summary": "Get Order Crypto Payment Data",
          "parameters": [
            {
              "name": "walletAddress",
              "required": true,
              "in": "path",
              "example": "0xF7EF457eD5CAF9540925AEcCbe4fA645b8d12a0d",
              "schema": {}
            },
            {
              "name": "tokenType",
              "required": true,
              "in": "path",
              "example": "BNB",
              "schema": {
                "enum": [
                  "USDT",
                  "USDC",
                  "BINANCE_PEG_BSC_USD",
                  "CSPR",
                  "MATIC",
                  "BNB",
                  "XRP",
                  "BASE",
                  "LINEA",
                  "ETH",
                  "MEW",
                  "PARAM",
                  "SOL",
                  "PARAMT",
                  "PARAMB",
                  "BDC",
                  "RBNT",
                  "BTC"
                ],
                "type": "string"
              }
            },
            {
              "name": "paymentType",
              "required": true,
              "in": "path",
              "example": "BINANCE",
              "schema": {
                "enum": [
                  "CASPER",
                  "POLYGON",
                  "BINANCE",
                  "REDBELLY",
                  "BITLAYER",
                  "ETH",
                  "STACKS",
                  "XRPLSIDECHAIN",
                  "NEAR",
                  "SKALE",
                  "BASE",
                  "LINEA",
                  "SOLANA"
                ],
                "type": "string"
              }
            },
            {
              "name": "cartId",
              "required": true,
              "in": "path",
              "example": "636fd84d0a7a1ec1a6d66e33",
              "schema": {}
            }
          ],
          "responses": {
            "201": {
              "description": "a message consists of checkout description"
            }
          },
          "tags": [
            "checkouts"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/checkout/v2/public/anonymous-cart/{cartID}/stripeSession": {
        "post": {
          "operationId": "CheckoutController_createStripeCheckoutSession",
          "summary": "Initialize stripe sessin for test",
          "parameters": [
            {
              "name": "cartID",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AnonymousCartCasperCheckoutDTO"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "a message consists of checkout description"
            }
          },
          "tags": [
            "checkouts"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/payment/webhook/paymob": {
        "post": {
          "operationId": "PaymentController_webhookPaympbPayment",
          "parameters": [
            {
              "name": "hmac",
              "required": true,
              "in": "query",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "payments"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/payment/test/testPayment": {
        "post": {
          "operationId": "PaymentController_testPayment",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/TestPayment"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "payments"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/payment/test/testSampleOrderPayment": {
        "post": {
          "operationId": "PaymentController_testSampleOrderPayment",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/TestSampleOrderPayment"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "payments"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/payment/webhook/generic": {
        "post": {
          "operationId": "PaymentController_genericWebhookHandler",
          "parameters": [],
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "payments"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/order/status": {
        "get": {
          "operationId": "OrderController_getOrdersStatus",
          "summary": "get user's orders statuses",
          "parameters": [],
          "responses": {
            "200": {
              "description": "a message consists of user orders statuses",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array"
                  }
                }
              }
            }
          },
          "tags": [
            "orders"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/order": {
        "get": {
          "operationId": "OrderController_getOrders",
          "summary": "get user's ordres",
          "parameters": [
            {
              "name": "page",
              "required": false,
              "in": "query",
              "example": 1,
              "description": "page",
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "example": 20,
              "description": "limit",
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "status",
              "required": false,
              "in": "query",
              "example": "INITIALIZED_FOR_PAYMENT",
              "description": "ORDER_STATUS",
              "schema": {
                "enum": [
                  "PAYMENT_CONFIRMED",
                  "WAITING_FOR_PAYMENT",
                  "WAITING_FOR_CONFIRMATION",
                  "INITIALIZED_FOR_PAYMENT",
                  "PROCESSING",
                  "SENT",
                  "CANCELED",
                  "CANCELED_PAYMENT_TIMEOUT",
                  "REFUNDED"
                ],
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "a message consists of user orders"
            }
          },
          "tags": [
            "orders"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/order/{id}": {
        "get": {
          "operationId": "OrderController_getOrder",
          "summary": "get order by id",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "example": "636fd84d0a7a1ec1a6d66e33",
              "description": "order id",
              "schema": {}
            }
          ],
          "responses": {
            "200": {
              "description": "a message consists of request order"
            }
          },
          "tags": [
            "orders"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "put": {
          "operationId": "OrderController_updateOrder",
          "summary": "update order status by id",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "example": "636fd84d0a7a1ec1a6d66e33",
              "description": "order id",
              "schema": {}
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateOrderDTO"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "a message consists of updated order"
            }
          },
          "tags": [
            "orders"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/order/public/{id}": {
        "get": {
          "operationId": "OrderController_publicGetOrder",
          "summary": "get order by id",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "example": "636fd84d0a7a1ec1a6d66e33",
              "description": "order id",
              "schema": {}
            }
          ],
          "responses": {
            "200": {
              "description": "a message consists of request order"
            }
          },
          "tags": [
            "orders"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/order/cancel/{id}": {
        "post": {
          "operationId": "OrderController_cancelOrder",
          "summary": "cancel order by id",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "example": "636fd84d0a7a1ec1a6d66e33",
              "description": "order id",
              "schema": {}
            }
          ],
          "responses": {
            "200": {
              "description": "a message consists of canceled order"
            }
          },
          "tags": [
            "orders"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/order/payment/{chain}": {
        "post": {
          "operationId": "OrderController_handleOrderPayment",
          "summary": "Send Order Transaction to Web3 Service",
          "parameters": [
            {
              "name": "chain",
              "required": true,
              "in": "path",
              "example": "SOLANA",
              "schema": {
                "enum": [
                  "CASPER",
                  "POLYGON",
                  "BINANCE",
                  "REDBELLY",
                  "BITLAYER",
                  "ETH",
                  "STACKS",
                  "XRPLSIDECHAIN",
                  "NEAR",
                  "SKALE",
                  "BASE",
                  "LINEA",
                  "SOLANA"
                ],
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/OrderPaymentBodyDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "orders"
          ],
          "security": [
            {
              "bearer": []
            },
            {
              "bearer": []
            }
          ]
        }
      },
      "/order/public/payment/{chain}": {
        "post": {
          "operationId": "OrderController_handleOrderPaymentPublic",
          "summary": "Send Order Payment to Web3 - Public",
          "parameters": [
            {
              "name": "chain",
              "required": true,
              "in": "path",
              "example": "SOLANA",
              "schema": {
                "enum": [
                  "CASPER",
                  "POLYGON",
                  "BINANCE",
                  "REDBELLY",
                  "BITLAYER",
                  "ETH",
                  "STACKS",
                  "XRPLSIDECHAIN",
                  "NEAR",
                  "SKALE",
                  "BASE",
                  "LINEA",
                  "SOLANA"
                ],
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/OrderPaymentBodyDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "orders"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/order/single/{orderId}": {
        "get": {
          "operationId": "OrderController_getSingleOrder",
          "summary": "Get Single Order By Id (new)",
          "parameters": [
            {
              "name": "orderId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Order Data"
            }
          },
          "tags": [
            "orders"
          ],
          "security": [
            {
              "bearer": []
            },
            {
              "bearer": []
            }
          ]
        }
      },
      "/order/single/customer/{orderId}": {
        "get": {
          "operationId": "OrderController_getSingleCustomerOrder",
          "summary": "Get Single Customer Order By Id (new)",
          "parameters": [
            {
              "name": "orderId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Order Data"
            }
          },
          "tags": [
            "orders"
          ],
          "security": [
            {
              "bearer": []
            },
            {
              "bearer": []
            }
          ]
        }
      },
      "/order/retrieve/customer/orders": {
        "get": {
          "operationId": "OrderController_showCustomerOrders",
          "summary": "Get Customer Orders",
          "parameters": [
            {
              "name": "page",
              "required": false,
              "in": "query",
              "example": 1,
              "description": "page",
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "example": 20,
              "description": "limit",
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "status",
              "required": false,
              "in": "query",
              "example": "INITIALIZED_FOR_PAYMENT",
              "description": "ORDER_STATUS",
              "schema": {
                "enum": [
                  "PAYMENT_CONFIRMED",
                  "WAITING_FOR_PAYMENT",
                  "WAITING_FOR_CONFIRMATION",
                  "INITIALIZED_FOR_PAYMENT",
                  "PROCESSING",
                  "SENT",
                  "CANCELED",
                  "CANCELED_PAYMENT_TIMEOUT",
                  "REFUNDED"
                ],
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Order Data"
            }
          },
          "tags": [
            "orders"
          ],
          "security": [
            {
              "bearer": []
            },
            {
              "bearer": []
            }
          ]
        }
      },
      "/order/sample/order": {
        "post": {
          "operationId": "OrderController_initializeSampleOrder",
          "summary": "Initialize Sample Order",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SampleOrderDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Order Data",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/SampleOrder"
                  }
                }
              }
            }
          },
          "tags": [
            "orders"
          ],
          "security": [
            {
              "bearer": []
            },
            {
              "bearer": []
            }
          ]
        },
        "put": {
          "operationId": "OrderController_submitSampleOrder",
          "summary": "Set Sample Order Shipping Rate and Initialize Stripe",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SubmitSampleOrderDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Updated Order with Shipping Rate and also stripe payment id",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/SampleOrder"
                  }
                }
              }
            }
          },
          "tags": [
            "orders"
          ],
          "security": [
            {
              "bearer": []
            },
            {
              "bearer": []
            }
          ]
        },
        "delete": {
          "operationId": "OrderController_cancelSampleOrder",
          "summary": "Cancel Sample Order",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "orders"
          ],
          "security": [
            {
              "bearer": []
            },
            {
              "bearer": []
            }
          ]
        }
      },
      "/order/all/sample/order": {
        "get": {
          "operationId": "OrderController_getAllSampleOrders",
          "summary": "Show all sample orders",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "orders"
          ],
          "security": [
            {
              "bearer": []
            },
            {
              "bearer": []
            }
          ]
        }
      },
      "/order/sample/order/{sampleOrderId}": {
        "get": {
          "operationId": "OrderController_getSampleOrders",
          "summary": "single sample orders",
          "parameters": [
            {
              "name": "sampleOrderId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/SampleOrder"
                  }
                }
              }
            }
          },
          "tags": [
            "orders"
          ],
          "security": [
            {
              "bearer": []
            },
            {
              "bearer": []
            }
          ]
        }
      },
      "/order/submit/pre/purchased/data/{orderId}": {
        "post": {
          "operationId": "OrderController_addPrePurchasedToItem",
          "parameters": [
            {
              "name": "orderId",
              "required": true,
              "in": "path",
              "example": "62acaca3cf66d8c0b581b69d",
              "description": "order id",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "example": {
                    "title": "title from the product pre purchase data",
                    "data": " the input that the customer gives "
                  }
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "orders"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/order/tracking-url/{id}": {
        "patch": {
          "operationId": "OrderController_attachTrackingUrlToOrder",
          "summary": "Attach Tracking Url to Order",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AttachTrackingUrlDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "orders"
          ],
          "security": [
            {
              "bearer": []
            },
            {
              "bearer": []
            }
          ]
        }
      },
      "/order/SOLANA/{id}": {
        "get": {
          "operationId": "OrderController_getSolanaInformation",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "orders"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/order/report/export/excel": {
        "get": {
          "operationId": "OrderController_ordersExcelReport",
          "summary": "Get an Excel file of orders",
          "parameters": [],
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "orders"
          ],
          "security": [
            {
              "bearer": []
            },
            {
              "bearer": []
            }
          ]
        }
      },
      "/order/product/{productId}": {
        "get": {
          "operationId": "OrderController_ordersOfAProduct",
          "summary": "Get orders of a product",
          "parameters": [
            {
              "name": "productId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "orders"
          ],
          "security": [
            {
              "bearer": []
            },
            {
              "bearer": []
            }
          ]
        }
      },
      "/notification": {
        "get": {
          "operationId": "NotificationController_getNotifications",
          "summary": "get user's notifications",
          "parameters": [],
          "responses": {
            "200": {
              "description": "a message consists of user notifications",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/Notification"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "notifications"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/notification/{id}": {
        "get": {
          "operationId": "NotificationController_getNotificationByID",
          "summary": "get notification by id",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "example": "636fd84d0a7a1ec1a6d66e33",
              "description": "notification id",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "a message consists of requested notification",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Notification"
                  }
                }
              }
            }
          },
          "tags": [
            "notifications"
          ]
        },
        "post": {
          "operationId": "NotificationController_seenNotificationsByID",
          "summary": "update notification seen status",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "example": "636fd84d0a7a1ec1a6d66e33",
              "description": "notification id",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "201": {
              "description": "a message consists of updated notificataion",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Notification"
                  }
                }
              }
            }
          },
          "tags": [
            "notifications"
          ]
        }
      },
      "/notification/test/create/order": {
        "get": {
          "operationId": "NotificationController_sendTestEmail",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "notifications"
          ]
        }
      },
      "/webhook/printful": {
        "post": {
          "operationId": "WebhookController_handlePrintfulWebhook",
          "parameters": [],
          "responses": {
            "201": {
              "description": ""
            }
          }
        }
      },
      "/webhook/easy-post": {
        "post": {
          "operationId": "WebhookController_handleEasyPostWebhook",
          "parameters": [],
          "responses": {
            "201": {
              "description": ""
            }
          }
        }
      },
      "/email/contact-us": {
        "post": {
          "operationId": "EmailController_contactUs",
          "summary": "send email to droplinked support",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateMessageDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "a message consists of user successfully send email"
            }
          },
          "tags": [
            "email"
          ]
        }
      },
      "/shopify/checkout": {
        "post": {
          "operationId": "ShopifyController_createCheckoutShopify",
          "summary": "Create a checkout for producer in Shopify",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/createCheckoutShopifyDTO"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "A message consists of created checkout"
            }
          },
          "tags": [
            "shopifyAPIs"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "put": {
          "operationId": "ShopifyController_updateShopifyCheckout",
          "summary": "Get products for producer in Shopify",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/updateShopifyCheckoutDTO"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "A message updated checkout in the Shopify"
            }
          },
          "tags": [
            "shopifyAPIs"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/shopify/public/checkout": {
        "post": {
          "operationId": "ShopifyController_createPublicCheckoutShopify",
          "summary": "Create a checkout for customer without any JWT in Shopify",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/createCheckoutShopifyDTO"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "A message consists of created checkout"
            }
          },
          "tags": [
            "shopifyAPIs"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "put": {
          "operationId": "ShopifyController_updatePublicShopifyCheckout",
          "summary": "Get products for producer in Shopify",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/updateShopifyCheckoutDTO"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "A message updated checkout in the Shopify"
            }
          },
          "tags": [
            "shopifyAPIs"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/shopify/public/checkout/no-reg": {
        "post": {
          "operationId": "ShopifyController_creatPublicCheckoutShopify",
          "summary": "Created checkout without registering new user",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/createCheckoutShopifyDTO"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "A message consists of created checkout"
            }
          },
          "tags": [
            "shopifyAPIs"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/shopify/checkout/payment": {
        "post": {
          "operationId": "ShopifyController_createPaymentShopify",
          "summary": "Create a payment for producer in Shopify",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/createPaymentShopifyDTO"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "A message consists of created payment"
            }
          },
          "tags": [
            "shopifyAPIs"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/shopify/public/checkout/payment": {
        "post": {
          "operationId": "ShopifyController_createPublicPaymentShopify",
          "summary": "Create a payment for producer in Shopify",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/createPaymentShopifyDTO"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "A message consists of created payment"
            }
          },
          "tags": [
            "shopifyAPIs"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/shopify/{shopDomain}/product/{productID}": {
        "get": {
          "operationId": "ShopifyController_getShopifyProduct",
          "summary": "Get products for producer in Shopify",
          "parameters": [],
          "responses": {
            "200": {
              "description": "A message consists of products in the Shopify"
            }
          },
          "tags": [
            "shopifyAPIs"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/shopify/public/{shopDomain}/product/{productID}": {
        "get": {
          "operationId": "ShopifyController_getPublicShopifyProduct",
          "summary": "Get products for producer in Shopify",
          "parameters": [],
          "responses": {
            "200": {
              "description": "A message consists of products in the Shopify"
            }
          },
          "tags": [
            "shopifyAPIs"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/shopify/checkout/shipping-rate": {
        "put": {
          "operationId": "ShopifyController_getShopifyShippingRate",
          "summary": "Get shipping rate for producer in Shopify",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/getShippingRateDTO"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "A message consists of shipping rate in the Shopify"
            }
          },
          "tags": [
            "shopifyAPIs"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/shopify/public/checkout/shipping-rate": {
        "put": {
          "operationId": "ShopifyController_getPublicShopifyShippingRate",
          "summary": "Get shipping rate for producer in Shopify",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/getShippingRateDTO"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "A message consists of shipping rate in the Shopify"
            }
          },
          "tags": [
            "shopifyAPIs"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/affiliate/request/{productID}": {
        "get": {
          "operationId": "AffiliateController_getAllRequestsOfProduct",
          "summary": "List of requests for given product ID .",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "affiliate"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/affiliate/request/information/{requestID}": {
        "get": {
          "operationId": "AffiliateController_getRequestByID",
          "summary": "Get information of given request ID .",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "affiliate"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/affiliate/producer/requests": {
        "get": {
          "operationId": "AffiliateController_getAllRequestsOfProducer",
          "summary": "Get list of requests sent to producer .",
          "parameters": [
            {
              "name": "page",
              "required": true,
              "in": "query",
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "limit",
              "required": true,
              "in": "query",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "affiliate"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/affiliate/publisher/requests": {
        "get": {
          "operationId": "AffiliateController_getAllRequestsOfPublisher",
          "summary": "Get list of requests that a publisher has sent .",
          "parameters": [
            {
              "name": "page",
              "required": true,
              "in": "query",
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "limit",
              "required": true,
              "in": "query",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "affiliate"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/affiliate/{chain}/request": {
        "post": {
          "operationId": "AffiliateController_affiliateRequest",
          "summary": "Send affiliate request for SKU of a product .",
          "parameters": [
            {
              "name": "chain",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AffiliateRequestDTO"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "affiliate"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/affiliate/{chain}/request/accept-reject": {
        "post": {
          "operationId": "AffiliateController_acceptRejectRequest",
          "summary": "Accept or reject affiliate request .",
          "parameters": [
            {
              "name": "chain",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AcceptRejectRequestDTO"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "affiliate"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/affiliate/casper/request/cancel": {
        "post": {
          "operationId": "AffiliateController_casperCancelRequest",
          "summary": "Cancel affiliate request .",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CasperCancelRequestDTO"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "affiliate"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/affiliate/add/shop/id": {
        "get": {
          "operationId": "AffiliateController_addShopId",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "affiliate"
          ]
        }
      },
      "/http-req/img": {
        "get": {
          "operationId": "HttpReqController_getImageR",
          "parameters": [
            {
              "name": "url",
              "required": true,
              "in": "query",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "http-req"
          ]
        }
      },
      "/http-req": {
        "get": {
          "operationId": "HttpReqController_getRequestURL_get",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "http-req"
          ]
        },
        "post": {
          "operationId": "HttpReqController_getRequestURL_post",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "http-req"
          ]
        },
        "put": {
          "operationId": "HttpReqController_getRequestURL_put",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "http-req"
          ]
        },
        "delete": {
          "operationId": "HttpReqController_getRequestURL_delete",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "http-req"
          ]
        },
        "patch": {
          "operationId": "HttpReqController_getRequestURL_patch",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "http-req"
          ]
        },
        "options": {
          "operationId": "HttpReqController_getRequestURL_options",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "http-req"
          ]
        },
        "head": {
          "operationId": "HttpReqController_getRequestURL_head",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "http-req"
          ]
        },
        "search": {
          "operationId": "HttpReqController_getRequestURL_search",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "http-req"
          ]
        }
      },
      "/storage/{key}": {
        "get": {
          "operationId": "StorageController_getPairFromStorage",
          "summary": "Get corresponding value of a key .",
          "parameters": [
            {
              "name": "key",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "storage"
          ]
        },
        "delete": {
          "operationId": "StorageController_removePairFromStorage",
          "summary": "Remove key/value pair from data storage .",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "storage"
          ]
        }
      },
      "/storage": {
        "post": {
          "operationId": "StorageController_addPairToStorage",
          "summary": "Add key/value pair to data storage .",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AddPairDTO"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "storage"
          ]
        }
      },
      "/pod/providers": {
        "get": {
          "operationId": "PODController_getProviders",
          "summary": "Get list of providers",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "POD Raw Products"
          ]
        }
      },
      "/pod/printful/categories": {
        "get": {
          "operationId": "PODController_getCategories",
          "summary": "Get list of categories",
          "parameters": [
            {
              "name": "mainCategoryId",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "POD Raw Products"
          ]
        }
      },
      "/pod/printful/products": {
        "get": {
          "operationId": "PODController_getProducts",
          "summary": "Get list of products",
          "parameters": [
            {
              "name": "subCategoryId",
              "required": true,
              "in": "query",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "POD Raw Products"
          ]
        }
      },
      "/pod/provider/{provider}/products": {
        "get": {
          "operationId": "PODController_getProviderProducts",
          "summary": "Get list of products for a provider",
          "parameters": [
            {
              "name": "provider",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "POD Raw Products"
          ]
        }
      },
      "/pod/product/{id}": {
        "get": {
          "operationId": "PODController_getProduct",
          "summary": "Get POD Blank Product",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "POD Raw Products"
          ]
        }
      },
      "/pod/printful/product/{productId}": {
        "get": {
          "operationId": "PODController_getPrintfulProductDetails",
          "summary": "Get list of products color and sizes",
          "parameters": [
            {
              "name": "productId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "POD Raw Products"
          ]
        }
      },
      "/pod/print-positions/{provider}/{productId}": {
        "get": {
          "operationId": "PODController_getPrintPositions",
          "summary": "Get print positions",
          "parameters": [
            {
              "name": "provider",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "productId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "templateId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "POD Raw Products"
          ]
        }
      },
      "/pod/variant-options/{provider}/{productId}": {
        "get": {
          "operationId": "PODController_getVariantsOptions",
          "summary": "Get available variants",
          "parameters": [
            {
              "name": "provider",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "productId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "templateId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "POD Raw Products"
          ]
        }
      },
      "/pod/available-variants/{provider}/{productId}/{templateId}": {
        "get": {
          "operationId": "PODController_getAvailableVariants",
          "summary": "Get available variants",
          "parameters": [
            {
              "name": "provider",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "productId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "templateId",
              "required": false,
              "in": "path",
              "description": "template Id",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "POD Raw Products"
          ]
        }
      },
      "/pod/generate-mockup/{productId}": {
        "post": {
          "operationId": "PODController_generateMockup",
          "summary": "Generate Mockup",
          "parameters": [
            {
              "name": "productId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "order",
              "required": true,
              "in": "query",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/GenerateMockupBody"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "POD Raw Products"
          ]
        }
      },
      "/pod/printful/nonces": {
        "post": {
          "operationId": "PODController_getNonce",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/GetPrintfulNonceDTO"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "POD Raw Products"
          ]
        }
      },
      "/pod/generate/overlay": {
        "post": {
          "operationId": "PODController_generateOverlay",
          "summary": "",
          "description": "generate overlay",
          "parameters": [
            {
              "name": "bgremove",
              "required": true,
              "in": "query",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/GenerateOverlayDTO"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "POD Raw Products"
          ]
        }
      },
      "/pod/generate/text/overlay": {
        "post": {
          "operationId": "PODController_generateTextOverlay",
          "summary": "",
          "description": "generate text overlay",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/GenerateOverlayDTO"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "POD Raw Products"
          ]
        }
      },
      "/pod/remove/background": {
        "post": {
          "operationId": "PODController_removeBg",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "example": {
                    "imageUrl": "ImageUrl"
                  }
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "POD Raw Products"
          ]
        }
      },
      "/pod/printful/techniques/product/{id}": {
        "get": {
          "operationId": "PODController_getProductTechniques",
          "summary": "Get product techniques",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "POD Raw Products"
          ]
        }
      },
      "/locations/countries": {
        "get": {
          "operationId": "LocationsController_getCountries",
          "summary": "Returns list of countries",
          "parameters": [
            {
              "name": "",
              "required": true,
              "in": "query",
              "example": "?name=United States&offset=2",
              "schema": {}
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "locations"
          ]
        }
      },
      "/locations/states": {
        "get": {
          "operationId": "LocationsController_getStates",
          "summary": "Returns list of states",
          "parameters": [
            {
              "name": "",
              "required": true,
              "in": "query",
              "example": "?name=tehran&country_name=United States&offset=2",
              "schema": {}
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "locations"
          ]
        }
      },
      "/locations/cities": {
        "get": {
          "operationId": "LocationsController_getCities",
          "summary": "Returns list of cities",
          "parameters": [
            {
              "name": "",
              "required": true,
              "in": "query",
              "example": "?name=los angeles&country_id=233&offset=2",
              "schema": {}
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "locations"
          ]
        }
      },
      "/variant-options": {
        "post": {
          "operationId": "VariantOptionsController_create",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "variant-options"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "get": {
          "operationId": "VariantOptionsController_findAll",
          "summary": "get all variants",
          "parameters": [],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/VariantOption"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "variant-options"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/variant-options/{productType}": {
        "get": {
          "operationId": "VariantOptionsController_findVariantOptionsByProductType",
          "summary": "Find Variant Options by Product Type",
          "parameters": [
            {
              "name": "productType",
              "required": true,
              "in": "path",
              "schema": {
                "enum": [
                  "NORMAL",
                  "PRINT_ON_DEMAND",
                  "DIGITAL",
                  "EVENT"
                ],
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "variant-options"
          ]
        }
      },
      "/variant-options/{provider}/{productId}": {
        "get": {
          "operationId": "VariantOptionsController_findVariantOptions",
          "summary": "Find Variant Options by Product ID and Providers",
          "parameters": [
            {
              "name": "provider",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "productId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "variant-options"
          ]
        }
      },
      "/giftcard/create": {
        "post": {
          "operationId": "GiftCardController_createGiftCard",
          "summary": "create gift card",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateGiftCardDTO"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "gift card details"
            }
          },
          "tags": [
            "giftCard"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/giftcard/apply/{code}": {
        "patch": {
          "operationId": "GiftCardController_applyGiftCard",
          "summary": "Apply Gift Card to Cart (Authenticated User)",
          "parameters": [
            {
              "name": "code",
              "required": true,
              "in": "path",
              "example": "dfr54tgy6u",
              "description": "Gift Card code",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Apply Gift Card to Cart (Authenticated User)"
            }
          },
          "tags": [
            "giftCard"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/giftcard/public/apply/{code}/{cartId}": {
        "patch": {
          "operationId": "GiftCardController_applyGiftCardPublic",
          "summary": "Apply Gift Card to Cart (Anonymous)",
          "parameters": [
            {
              "name": "code",
              "required": true,
              "in": "path",
              "example": "dfr54tgy6u",
              "description": "Gift Card code",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "cartId",
              "required": true,
              "in": "path",
              "example": "64cf871007f3ef6c1c01b931",
              "description": "Cart Id",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Apply Gift Card to Cart (Anonymous)"
            }
          },
          "tags": [
            "giftCard"
          ]
        }
      },
      "/giftcard/remove": {
        "patch": {
          "operationId": "GiftCardController_removeGiftCard",
          "summary": "Remove Gift Card from Cart (Authenticated User)",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Remove Gift Card from Cart (Authenticated User)"
            }
          },
          "tags": [
            "giftCard"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/giftcard/public/remove/{cartId}": {
        "patch": {
          "operationId": "GiftCardController_removeGiftCardPublic",
          "summary": "Remove Gift Card from Cart (Anonymous)",
          "parameters": [
            {
              "name": "cartId",
              "required": true,
              "in": "path",
              "example": "64cf871007f3ef6c1c01b931",
              "description": "Cart Id",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Remove Gift Card from Cart (Anonymous)"
            }
          },
          "tags": [
            "giftCard"
          ]
        }
      },
      "/giftcard": {
        "get": {
          "operationId": "GiftCardController_getAllGiftCard",
          "summary": "get all giftCard",
          "parameters": [
            {
              "name": "page",
              "required": false,
              "in": "query",
              "example": "1",
              "description": "page number",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "example": "20",
              "description": "limit",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "search",
              "required": false,
              "in": "query",
              "example": "summer discount",
              "description": "search in name",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "get all giftCard"
            }
          },
          "tags": [
            "giftCard"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/giftcard/expire/{id}": {
        "patch": {
          "operationId": "GiftCardController_updateExpireDate",
          "summary": "Update Gift Card Expire Date",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateExpireDate"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Updated Gift Card"
            }
          },
          "tags": [
            "giftCard"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/giftcard/add/shop/id": {
        "get": {
          "operationId": "GiftCardController_addShopId",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "giftCard"
          ]
        }
      },
      "/giftcard/{giftCardId}/report/export/excel": {
        "get": {
          "operationId": "GiftCardController_giftCardsExcelReport",
          "summary": "Get an Excel file of gift cards",
          "parameters": [
            {
              "name": "giftCardId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "giftCard"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v1/shop": {
        "get": {
          "operationId": "PublicApiController_getShop",
          "summary": "Get complete shop information",
          "parameters": [
            {
              "name": "x-shop-id",
              "in": "header",
              "description": "Add your client ID in the header as x-shop-id",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Successfully retrieved shop information",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "_id": "6756fba81ebb5688d79189ea",
                      "addressBookID": "675d360259ed0012eece16fa",
                      "admins": [],
                      "backgroundColor": "#141414",
                      "backgroundImage": "https://example.com/images/background.jpg",
                      "backgroundImageSecondary": "https://example.com/images/background-secondary.jpg",
                      "backgroundText": "Welcome to our shop",
                      "createdAt": "2024-12-09T14:16:08.941Z",
                      "currency": {
                        "abbreviation": "USD",
                        "conversionRateToUSD": 1,
                        "symbol": "$"
                      },
                      "description": "A modern e-commerce shop with a wide range of products",
                      "discordURL": "https://discord.gg/example",
                      "facebookURL": "https://facebook.com/example",
                      "fullWidthHero": true,
                      "hasCustomDomain": false,
                      "headerIcon": "https://example.com/images/icon.png",
                      "imsTypeUpdated": false,
                      "instagramURL": "https://instagram.com/example",
                      "isAgeRestricted": false,
                      "isCatalogMode": false,
                      "launchDate": null,
                      "linkedinURL": "https://linkedin.com/company/example",
                      "loginMethods": [
                        {
                          "name": "Google",
                          "isActivated": true,
                          "type": "SOCIAL"
                        },
                        {
                          "name": "Metamask",
                          "isActivated": true,
                          "type": "WALLET"
                        }
                      ],
                      "logo": "https://example.com/images/logo.png",
                      "name": "Example Shop",
                      "ownerID": "6756fba81ebb5688d79189e6",
                      "paymentMethods": [
                        {
                          "type": "STRIPE",
                          "isActive": true,
                          "supportedChains": [],
                          "_id": "676bc3b81f7121bfcb26498f"
                        },
                        {
                          "type": "COINBASE",
                          "isActive": true,
                          "supportedChains": [],
                          "_id": "678f5a391eeefc358d979707"
                        }
                      ],
                      "shopDesign": {
                        "fontfamily": "Montserrat",
                        "headerBackground": "#ffffff",
                        "isHeaderFixed": true,
                        "hiroLayout": "right_text",
                        "hiroTextColor": "#000000",
                        "productListTitle": "Featured Products",
                        "backgroundBody": "#141414",
                        "foreground": "#222222",
                        "textColorParagraphs": "#ffffff",
                        "iconHeaderColor": "#8937a4",
                        "footerLinks": [
                          {
                            "caption": "About Us",
                            "link": "/about"
                          },
                          {
                            "caption": "Contact",
                            "link": "/contact"
                          }
                        ],
                        "bannerLinks": [],
                        "isCollectionShown": true,
                        "isLogoAsFavicon": true,
                        "faviconURL": "https://example.com/favicon.ico"
                      },
                      "tags": [
                        "electronics",
                        "fashion"
                      ],
                      "templateID": {
                        "_id": "6523b829f31b22884436a8da",
                        "name": "source_light",
                        "background": "#FFFFFF",
                        "foreground": "#F7F7F2",
                        "textColor": "#121314",
                        "fontFamily": "Source Serif Pro",
                        "borderColor": "#f2f2f2"
                      },
                      "paymentWallets": [
                        {
                          "type": "EVM",
                          "destinationAddress": [
                            {
                              "destinationAddress": "0x1234...5678",
                              "percent": 100
                            }
                          ],
                          "_id": "67d550caa3a00a5ac273e248"
                        }
                      ],
                      "hasBlog": false,
                      "tokenBasedPricing": {
                        "token": "",
                        "unit": 0,
                        "hasTokenBasedPricing": false,
                        "tokenSign": ""
                      }
                    }
                  }
                }
              }
            },
            "404": {
              "description": "Shop not found"
            }
          }
        }
      },
      "/v1/products": {
        "get": {
          "operationId": "PublicApiController_findAll",
          "summary": "Retrieve paginated list of shop products",
          "parameters": [
            {
              "name": "page",
              "required": false,
              "in": "query",
              "description": "Page number for pagination",
              "example": 1,
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "description": "Number of products per page",
              "example": 15,
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "search",
              "required": false,
              "in": "query",
              "description": "Search term to filter products",
              "example": "fsdfa",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "x-shop-id",
              "in": "header",
              "description": "Your client ID to identify the shop",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Successfully retrieved paginated products list",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "data": [
                        {
                          "_id": "67695b8b746ef69da29c2067",
                          "title": "Men's Fitted T-Shirt",
                          "ownerID": "6756fba81ebb5688d79189e6",
                          "shopIds": [
                            "6756fba81ebb5688d79189ea"
                          ],
                          "recordData": {
                            "status": "NOT_RECORDED",
                            "recordNetwork": "NONE",
                            "currency": "NONE",
                            "commision": 0
                          },
                          "price": 34,
                          "rawPrice": 24,
                          "quantity": -1,
                          "weight": 0,
                          "sold_units": 0,
                          "externalID": "5331",
                          "options": [
                            {
                              "variantID": "62a989e21f2c2bbc5b1e7154",
                              "variantName": "Size",
                              "value": "XS",
                              "caption": "XS",
                              "_id": "677b6d488c6b31f5c6aa9214",
                              "createdAt": "2025-01-06T05:42:32.038Z",
                              "updatedAt": "2025-01-06T05:42:32.038Z"
                            },
                            {
                              "variantID": "62a989ab1f2c2bbc5b1e7153",
                              "variantName": "Color",
                              "value": "#d50732",
                              "caption": "Red",
                              "_id": "677b6d488c6b31f5c6aa9215",
                              "createdAt": "2025-01-06T05:42:32.039Z",
                              "updatedAt": "2025-01-06T05:42:32.039Z"
                            }
                          ],
                          "dimensions": {
                            "height": 0,
                            "length": 0,
                            "width": 0
                          },
                          "vas": [
                            {
                              "name": "PRODUCTION",
                              "costType": "USD",
                              "value": 24,
                              "type": "PRINTFUL",
                              "receiver": "DROPLINKED"
                            }
                          ],
                          "royalty": 0,
                          "externalTicketId": null,
                          "commision": 0,
                          "partialOwners": [
                            {
                              "user": "6756fba81ebb5688d79189e6",
                              "quantity": -1
                            }
                          ],
                          "createdAt": "2024-12-23T12:46:03.623Z",
                          "updatedAt": "2024-12-23T12:46:03.623Z",
                          "__v": 0,
                          "image": "https://example.com/images/t-shirt-red.png",
                          "productCollectionID": {
                            "_id": "6756fba91ebb5688d79189fa",
                            "title": "Public Products",
                            "ownerID": "6756fba81ebb5688d79189e6",
                            "shopId": "6756fba81ebb5688d79189ea",
                            "nftImages": [],
                            "type": "DEFAULT_PUBLIC",
                            "image": "",
                            "description": "",
                            "published": true,
                            "createdAt": "2024-12-09T14:16:09.665Z",
                            "updatedAt": "2024-12-09T14:16:09.665Z",
                            "__v": 0,
                            "order": 4
                          },
                          "product_type": "PRINT_ON_DEMAND",
                          "publish_status": "PUBLISHED",
                          "lowestSkuPrice": 34
                        }
                      ],
                      "currentPage": 1,
                      "totalPages": 2,
                      "hasNextPage": true,
                      "hasPreviousPage": false,
                      "nextPage": 2,
                      "previousPage": null,
                      "limit": 20,
                      "totalDocuments": 34
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Bad request - Invalid parameters provided"
            },
            "404": {
              "description": "Shop not found"
            }
          }
        }
      },
      "/v1/products/slug/{slug}": {
        "get": {
          "operationId": "PublicApiController_getProductBySlug",
          "summary": "Get product details by slug",
          "description": "Retrieves detailed product information using the product slug. This endpoint is useful for SEO-friendly URLs and product pages.",
          "parameters": [
            {
              "name": "slug",
              "required": true,
              "in": "path",
              "description": "SEO-friendly URL slug of the product",
              "example": "premium-smart-led-bulb-v2",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "x-shop-id",
              "in": "header",
              "description": "Client ID for shop authentication",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Successfully retrieved product details",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "_id": "67d54e3fa3a00a5ac273de31",
                      "slug": "premium-smart-led-bulb-v2",
                      "title": "Premium Smart LED Bulb V2",
                      "description": "<p>Experience the future of lighting with our Premium Smart LED Bulb V2. Features include:<br>- Smart home integration with Alexa & Google Home<br>- 16 million color options<br>- Energy efficient design<br>- Mobile app control<br>- Scheduled lighting patterns<br>- Voice control enabled</p>",
                      "skuIDs": [
                        {
                          "price": 29.99,
                          "quantity": 100,
                          "_id": "67d54e3fa3a00a5ac273de33",
                          "externalID": "SLED-V2-001",
                          "dimensions": {
                            "width": 6.5,
                            "height": 12,
                            "length": 6.5
                          },
                          "weight": 0.3,
                          "options": [
                            {
                              "variantID": "62a989e21f2c2bbc5b1e7154",
                              "variantName": "Wattage",
                              "value": "9W",
                              "caption": "9 Watts"
                            },
                            {
                              "variantID": "62a989e21f2c2bbc5b1e7155",
                              "variantName": "Base Type",
                              "value": "E26",
                              "caption": "Standard E26/E27"
                            }
                          ]
                        }
                      ],
                      "media": [
                        {
                          "isMain": true,
                          "thumbnail": "https://example.com/images/smart-bulb-thumb.jpg",
                          "url": "https://example.com/images/smart-bulb-full.jpg",
                          "_id": "67d54e3fa3a00a5ac273de32"
                        }
                      ],
                      "productCollectionID": {
                        "_id": "6756fba91ebb5688d79189fa",
                        "title": "Smart Home Essentials",
                        "ownerID": "6756fba81ebb5688d79189e6",
                        "shopId": "6756fba81ebb5688d79189ea",
                        "nftImages": [],
                        "type": "DEFAULT_PUBLIC",
                        "image": "https://example.com/images/smart-home-collection.jpg",
                        "description": "Cutting-edge smart home products for the modern lifestyle",
                        "published": true,
                        "createdAt": "2024-12-09T14:16:09.665Z",
                        "updatedAt": "2024-12-09T14:16:09.665Z",
                        "__v": 0,
                        "order": 1
                      },
                      "ownerID": "6756fba81ebb5688d79189e6",
                      "product_type": "NORMAL",
                      "purchaseAvailable": true,
                      "shippingType": "EASY_POST",
                      "m2m_positions": [],
                      "m2m_services": []
                    }
                  }
                }
              }
            },
            "404": {
              "description": "Product not found with the given slug"
            }
          }
        }
      },
      "/v1/products/{id}": {
        "get": {
          "operationId": "PublicApiController_findOne",
          "summary": "Get product details by ID",
          "description": "Retrieves comprehensive product information including variants, media, pricing, and collection details. Useful for product detail pages and inventory management.",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "Unique identifier of the product",
              "example": "67d54e3fa3a00a5ac273de31",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "x-shop-id",
              "in": "header",
              "description": "Client ID for shop authentication",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Successfully retrieved product details",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "_id": "67d54e3fa3a00a5ac273de31",
                      "slug": "premium-smart-led-bulb-v2",
                      "title": "Premium Smart LED Bulb V2",
                      "description": "<p>Experience the future of lighting with our Premium Smart LED Bulb V2. Features include:<br>- Smart home integration with Alexa & Google Home<br>- 16 million color options<br>- Energy efficient design<br>- Mobile app control<br>- Scheduled lighting patterns<br>- Voice control enabled</p>",
                      "skuIDs": [
                        {
                          "price": 29.99,
                          "quantity": 100,
                          "_id": "67d54e3fa3a00a5ac273de33",
                          "externalID": "SLED-V2-001",
                          "dimensions": {
                            "width": 6.5,
                            "height": 12,
                            "length": 6.5
                          },
                          "weight": 0.3,
                          "options": [
                            {
                              "variantID": "62a989e21f2c2bbc5b1e7154",
                              "variantName": "Wattage",
                              "value": "9W",
                              "caption": "9 Watts"
                            },
                            {
                              "variantID": "62a989e21f2c2bbc5b1e7155",
                              "variantName": "Base Type",
                              "value": "E26",
                              "caption": "Standard E26/E27"
                            }
                          ]
                        }
                      ],
                      "media": [
                        {
                          "isMain": true,
                          "thumbnail": "https://example.com/images/smart-bulb-thumb.jpg",
                          "url": "https://example.com/images/smart-bulb-full.jpg",
                          "_id": "67d54e3fa3a00a5ac273de32"
                        },
                        {
                          "isMain": false,
                          "thumbnail": "https://example.com/images/smart-bulb-lifestyle-thumb.jpg",
                          "url": "https://example.com/images/smart-bulb-lifestyle-full.jpg",
                          "_id": "67d54e3fa3a00a5ac273de34"
                        }
                      ],
                      "productCollectionID": {
                        "_id": "6756fba91ebb5688d79189fa",
                        "title": "Smart Home Essentials",
                        "ownerID": "6756fba81ebb5688d79189e6",
                        "shopId": "6756fba81ebb5688d79189ea",
                        "nftImages": [],
                        "type": "DEFAULT_PUBLIC",
                        "image": "https://example.com/images/smart-home-collection.jpg",
                        "description": "Cutting-edge smart home products for the modern lifestyle",
                        "published": true,
                        "createdAt": "2024-12-09T14:16:09.665Z",
                        "updatedAt": "2024-12-09T14:16:09.665Z",
                        "__v": 0,
                        "order": 1
                      },
                      "ownerID": "6756fba81ebb5688d79189e6",
                      "product_type": "NORMAL",
                      "purchaseAvailable": true,
                      "shippingType": "EASY_POST",
                      "m2m_positions": [],
                      "m2m_services": []
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Invalid product ID format or malformed request"
            },
            "404": {
              "description": "Product not found with the given ID"
            }
          }
        }
      },
      "/v1/product/tile/{productTileId}": {
        "get": {
          "operationId": "PublicApiController_getProductTile",
          "parameters": [
            {
              "name": "productTileId",
              "required": true,
              "in": "path",
              "example": "6463f7cfd06c1637910d43d5",
              "description": "product tile id",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Product tile",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ProductTile"
                  }
                }
              }
            }
          }
        }
      },
      "/v1/cart": {
        "post": {
          "operationId": "PublicApiController_createCart",
          "summary": "Create a new shopping cart",
          "description": "Creates an empty cart for either an authenticated user or an anonymous customer. If access token is provided, creates a personalized cart tied to the user account. Otherwise creates an anonymous cart.",
          "parameters": [
            {
              "name": "x-shop-id",
              "in": "header",
              "description": "Client ID for shop authentication",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "201": {
              "description": "Cart created successfully",
              "schema": {
                "example": {
                  "status": "ACTIVE",
                  "type": "ANONYMOUS",
                  "paymentType": "STRIPE",
                  "availableShipmentRates": [],
                  "selectedShipmentRates": [],
                  "selectedShipmentRateIDs": [],
                  "shipmentInformation": [],
                  "_id": "67fa790cc5da053e89baf336",
                  "items": [],
                  "groupedItems": [],
                  "passedRules": [],
                  "costs": {
                    "subtotal": 0,
                    "totalWithoutDiscount": 0,
                    "discountApplied": 0,
                    "totalCartAmount": 0,
                    "droplinkedCommission": 0,
                    "stripeCommission": 0,
                    "droplinkedTotalShare": 0,
                    "producerNetProfit": 0,
                    "shipping": {
                      "droplinked": 0,
                      "producer": 0,
                      "total": 0
                    },
                    "taxes": {
                      "droplinked": 0,
                      "producer": 0,
                      "total": 0
                    }
                  },
                  "createdAt": "2025-04-12T14:30:36.812Z",
                  "updatedAt": "2025-04-12T14:30:36.812Z",
                  "__v": 0
                }
              },
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Cart"
                  }
                }
              }
            },
            "400": {
              "description": "Invalid request parameters"
            },
            "401": {
              "description": "Invalid or expired access token"
            }
          }
        }
      },
      "/v1/cart/{cartId}": {
        "get": {
          "operationId": "PublicApiController_getCart",
          "summary": "Retrieve cart information",
          "description": "Gets detailed information about a cart including items, totals, shipping info and gift card status. Works for both anonymous and authenticated carts.",
          "parameters": [
            {
              "name": "cartId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "x-shop-id",
              "in": "header",
              "description": "Client ID for shop authentication",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "returns the cart",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Cart"
                  }
                }
              }
            }
          }
        },
        "post": {
          "operationId": "PublicApiController_addProductToCart",
          "summary": "Add product to cart",
          "description": "Adds a product with specified SKU and options to an existing cart. Works for both anonymous and authenticated carts.",
          "parameters": [
            {
              "name": "cartId",
              "required": true,
              "in": "path",
              "description": "ID of the cart to add product to",
              "example": "67fa3a49c5da053e89baf1ad",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "x-shop-id",
              "in": "header",
              "description": "Client ID for shop authentication",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "description": "Product details to add to cart",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/addToAnonCartDTO"
                },
                "examples": {
                  "example1": {
                    "value": {
                      "skuID": "6791f9e201f727b25c336f64",
                      "quantity": 1,
                      "options": {
                        "color": {
                          "caption": "White",
                          "value": "#ffffff"
                        },
                        "size": {
                          "caption": "XS",
                          "value": "XS"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "returns the cart",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Cart"
                  }
                }
              }
            },
            "400": {
              "description": "Invalid cart ID or product details"
            },
            "404": {
              "description": "Cart or product not found"
            }
          }
        },
        "patch": {
          "operationId": "PublicApiController_update",
          "summary": "Update cart item quantity",
          "description": "Updates the quantity of a specific item in the cart. Can increase or decrease quantity.",
          "parameters": [
            {
              "name": "cartId",
              "required": true,
              "in": "path",
              "description": "ID of the cart to update",
              "example": "67fa3a49c5da053e89baf1ad",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "x-shop-id",
              "in": "header",
              "description": "Client ID for shop authentication",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "description": "Update quantity details",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateProductQuantityDTO"
                },
                "examples": {
                  "example1": {
                    "value": {
                      "skuID": "6791f9e201f727b25c336f64",
                      "shopID": "6756fba81ebb5688d79189ea",
                      "quantity": 2,
                      "itemId": "67fa3a4bc5da053e89baf1c3"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "returns the cart",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Cart"
                  }
                }
              }
            },
            "400": {
              "description": "Invalid cart ID or update data"
            },
            "404": {
              "description": "Cart or item not found"
            }
          }
        },
        "delete": {
          "operationId": "PublicApiController_remove",
          "summary": "Delete cart",
          "description": "Permanently removes a cart and all its items. This action cannot be undone.",
          "parameters": [
            {
              "name": "cartId",
              "required": true,
              "in": "path",
              "description": "ID of the cart to delete",
              "example": "67fa3a49c5da053e89baf1ad",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "x-shop-id",
              "in": "header",
              "description": "Client ID for shop authentication",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Cart successfully deleted"
            },
            "400": {
              "description": "Invalid cart ID format"
            },
            "404": {
              "description": "Cart not found"
            }
          }
        }
      },
      "/v1/product/generate/overlay": {
        "post": {
          "operationId": "PublicApiController_generateOverlay",
          "summary": "generate an overlay image from the uploaded nft image (you should show the nfts from the customer wallet) to use for mint to merch functionality",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/GenerateOverlayDTO"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "returns the overlay image modified with the base image positions"
            }
          }
        }
      },
      "/v1/product/mint/merch": {
        "post": {
          "operationId": "PublicApiController_mintToMerch",
          "summary": "Mint to Merch functionality",
          "parameters": [
            {
              "name": "access-token",
              "in": "header",
              "description": "you can send the access token if user has been logged in using droplinked oauth",
              "required": false,
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/GeneratePublicMockupBody"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "returns the mockup of the product with the chosen nft or image"
            }
          }
        }
      },
      "/v1/cart/add/item/preview/{cartId}/{itemId}": {
        "post": {
          "operationId": "PublicApiController_addMintToMerchToCart",
          "summary": "send the link of generated mockup to be added to cart, a m2m_preview field will be added to the cart item. show that instead of default image of the item.",
          "parameters": [
            {
              "name": "cartId",
              "required": true,
              "in": "path",
              "description": "id of the current cart",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "itemId",
              "required": true,
              "in": "path",
              "description": "Cart details retrieved successfully",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "x-shop-id",
              "in": "header",
              "description": "Client ID for shop authentication",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateCartM2MPreview"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "returns the modified cart"
            }
          }
        }
      },
      "/v1/cart/item/{cartId}": {
        "delete": {
          "operationId": "PublicApiController_removeItemFromCart",
          "summary": "Remove item from shopping cart",
          "description": "Removes a specific item from the cart. Returns the updated cart after removal.",
          "parameters": [
            {
              "name": "cartId",
              "required": true,
              "in": "path",
              "description": "Unique identifier of the cart",
              "example": "67fa3a49c5da053e89baf1ad",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "x-shop-id",
              "in": "header",
              "description": "Client ID for shop authentication",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "description": "Item details to remove from cart",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DeleteProductDTO"
                },
                "examples": {
                  "example1": {
                    "value": {
                      "itemId": "67fa3a4bc5da053e89baf1c3"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Item successfully removed from cart",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Cart"
                  }
                }
              }
            },
            "400": {
              "description": "Invalid cart ID or item ID format"
            },
            "404": {
              "description": "Cart or item not found"
            }
          }
        }
      },
      "/v1/cart/{cartId}/details": {
        "post": {
          "operationId": "PublicApiController_attachCartDetails",
          "summary": "Attach additional details to cart",
          "description": "Add or update email, shipping address and note for a cart",
          "parameters": [
            {
              "name": "cartId",
              "required": true,
              "in": "path",
              "description": "Unique identifier of the cart",
              "example": "67fa3a49c5da053e89baf1ad",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "x-shop-id",
              "in": "header",
              "description": "Client ID for shop authentication",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "description": "Additional details to attach to cart",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AttachAdditionalDetailsDto"
                },
                "examples": {
                  "example1": {
                    "value": {
                      "email": "customer@example.com",
                      "addressId": "67fa3a49c5da053e89baf1ad",
                      "note": "Please deliver during business hours"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Additional details successfully attached to cart",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Cart"
                  }
                }
              }
            },
            "400": {
              "description": "Invalid cart ID format or request body"
            },
            "404": {
              "description": "Cart not found"
            }
          }
        }
      },
      "/v1/cart/email/{cartId}": {
        "patch": {
          "operationId": "PublicApiController_addEmailToAnonCart",
          "summary": "Add email to anonymous cart",
          "description": "Add email to anonymous cart (use for not authenticated user)",
          "parameters": [
            {
              "name": "cartId",
              "required": true,
              "in": "path",
              "description": "cart id",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AddEmailToAnoymousCartDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "A message consist of cart and updated quantities.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Cart"
                  }
                }
              }
            }
          }
        }
      },
      "/v1/cart/payment-methods/{cartId}": {
        "get": {
          "operationId": "PublicApiController_getCartPaymentMethods",
          "summary": "Get available payment methods for cart",
          "description": "Returns a list of all available payment methods including cryptocurrency and traditional payment options",
          "parameters": [
            {
              "name": "cartId",
              "required": true,
              "in": "path",
              "description": "Cart ID",
              "example": "67fa3a49c5da053e89baf1ad",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "x-shop-id",
              "in": "header",
              "description": "Client ID for shop authentication",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Returns serialized payment methods for the cart",
              "schema": {
                "example": [
                  {
                    "type": "STRIPE",
                    "label": "Pay with USD",
                    "stripeType": "SHOPCURRENCY"
                  },
                  {
                    "type": "COINBASE",
                    "label": "Pay with COINBASE"
                  },
                  {
                    "type": "BINANCE",
                    "token": "USDC",
                    "isCustom": false,
                    "icon": "",
                    "chainId": "662a2ea36cce2d95a0eeccda",
                    "label": "Pay with BINANCE"
                  },
                  {
                    "type": "BINANCE",
                    "token": "BNB",
                    "isCustom": false,
                    "icon": "",
                    "chainId": "662a2ea36cce2d95a0eeccda",
                    "label": "Pay with BINANCE"
                  },
                  {
                    "type": "SKALE",
                    "token": "USDC",
                    "isCustom": false,
                    "icon": "",
                    "chainId": "66c2fbc5eb3fe55fbe27ffd7",
                    "label": "Pay with SKALE"
                  },
                  {
                    "type": "BITLAYER",
                    "token": "USDC",
                    "isCustom": false,
                    "icon": "",
                    "chainId": "6763a37f3d035adf9da3ec16",
                    "label": "Pay with BITLAYER"
                  },
                  {
                    "type": "POLYGON",
                    "token": "USDC",
                    "isCustom": false,
                    "icon": "",
                    "chainId": "662a2ea36cce2d95a0eeccd9",
                    "label": "Pay with POLYGON"
                  }
                ]
              },
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/CartPaymentMethod"
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Invalid cart ID format"
            },
            "404": {
              "description": "Cart not found"
            }
          }
        }
      },
      "/v1/locations/countries": {
        "get": {
          "operationId": "PublicApiController_getCountries",
          "summary": "Search countries",
          "description": "Returns a list of countries filtered by search query. Supports pagination and partial name matching.",
          "parameters": [
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "description": "Maximum number of records to return",
              "example": 10,
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "offset",
              "required": false,
              "in": "query",
              "description": "Number of records to skip",
              "example": 0,
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "name",
              "required": false,
              "in": "query",
              "description": "Search term to filter countries by name",
              "example": "us",
              "schema": {}
            },
            {
              "name": "x-shop-id",
              "in": "header",
              "description": "Client ID for shop authentication",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Successfully retrieved countries list",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "statusCode": 200,
                      "message": null,
                      "data": {
                        "countries": [
                          {
                            "_id": "645eb20ed39c5d06ec87cd78",
                            "id": 233,
                            "name": "United States",
                            "iso2": "US",
                            "currency_name": "United States dollar",
                            "currency_symbol": "$",
                            "emojiU": "U+1F1FA U+1F1F8",
                            "tax_rate": 0,
                            "tax_type": "none"
                          }
                        ],
                        "offset": 0,
                        "limit": 0,
                        "length": 1
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Invalid query parameters"
            }
          }
        }
      },
      "/v1/locations/cities": {
        "get": {
          "operationId": "PublicApiController_getCities",
          "summary": "Search cities",
          "description": "Returns a list of cities filtered by country name and/or city name. Includes state information and supports pagination.",
          "parameters": [
            {
              "name": "offset",
              "required": false,
              "in": "query",
              "description": "Number of records to skip",
              "example": 0,
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "description": "Maximum number of records to return",
              "example": 100,
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "name",
              "required": false,
              "in": "query",
              "description": "Search term to filter cities by name (partial match supported)",
              "example": "los a",
              "schema": {}
            },
            {
              "name": "country_name",
              "required": false,
              "in": "query",
              "description": "Full country name to filter cities",
              "example": "United States",
              "schema": {}
            },
            {
              "name": "x-shop-id",
              "in": "header",
              "description": "Client ID for shop authentication",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Successfully retrieved cities list",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "cities": [
                        {
                          "_id": "645eb3d7d39c5d06ec89dfcf",
                          "name": "Los Alamitos",
                          "state_name": "California"
                        },
                        {
                          "_id": "645eb3d7d39c5d06ec89dfd0",
                          "name": "Los Alamos",
                          "state_name": "California"
                        },
                        {
                          "_id": "645eb3e3d39c5d06ec8a055d",
                          "name": "Los Alamos",
                          "state_name": "New Mexico"
                        },
                        {
                          "_id": "645eb3d7d39c5d06ec89dfd3",
                          "name": "Los Angeles",
                          "state_name": "California"
                        }
                      ],
                      "limit": "100",
                      "length": 4
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Invalid query parameters"
            }
          }
        }
      },
      "/v1/customer/address": {
        "post": {
          "operationId": "PublicApiController_addAddressToCustomer",
          "summary": "Create a new customer address",
          "description": "Creates a new address record for a customer with detailed location and contact information",
          "parameters": [
            {
              "name": "x-shop-id",
              "in": "header",
              "description": "Client ID for shop authentication",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "description": "Address details",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/createAddressBooksDTO"
                },
                "examples": {
                  "example1": {
                    "summary": "Home Address",
                    "value": {
                      "firstName": "John",
                      "lastName": "Doe",
                      "phoneNumber": "+1234567890",
                      "address1": "123 Main Street",
                      "address2": "Apt 4B",
                      "city": "Los Angeles",
                      "state": "California",
                      "country": "United States",
                      "zipCode": "90001"
                    }
                  },
                  "example2": {
                    "summary": "Office Address",
                    "value": {
                      "firstName": "John",
                      "lastName": "Doe",
                      "phoneNumber": "+1234567890",
                      "address1": "456 Business Ave",
                      "address2": "Suite 100",
                      "city": "New York",
                      "state": "New York",
                      "country": "United States",
                      "zipCode": "10001"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Address created successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "_id": "645eb20ed39c5d06ec87cd78",
                      "firstName": "John",
                      "lastName": "Doe",
                      "phoneNumber": "+1234567890",
                      "address1": "123 Main Street",
                      "address2": "Apt 4B",
                      "city": "Los Angeles",
                      "state": "California",
                      "country": "United States",
                      "zipCode": "90001",
                      "addressType": "CUSTOMER",
                      "createdAt": "2024-03-15T10:30:00.000Z",
                      "updatedAt": "2024-03-15T10:30:00.000Z"
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Invalid address data provided",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "statusCode": 400,
                      "message": [
                        "phoneNumber must be a valid phone number"
                      ],
                      "error": "Bad Request"
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/v1/checkout/address/{cartId}": {
        "post": {
          "operationId": "PublicApiController_addAddressToCart",
          "summary": "Add the created address to the customer cart",
          "parameters": [
            {
              "name": "cartId",
              "required": true,
              "in": "path",
              "description": "cart id",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AddAddressDTO"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "A message that says address has been added to cart successfully ."
            }
          }
        }
      },
      "/v1/checkout/{cartID}/payment/{paymentType}/{tokenType}": {
        "post": {
          "operationId": "PublicApiController_createCheckoutChainAnonymousV2",
          "summary": "Create Checkout based on Chain",
          "parameters": [
            {
              "name": "cartID",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "paymentType",
              "required": true,
              "in": "path",
              "schema": {
                "enum": [
                  "CASPER",
                  "POLYGON",
                  "BINANCE",
                  "REDBELLY",
                  "BITLAYER",
                  "ETH",
                  "STACKS",
                  "XRPLSIDECHAIN",
                  "NEAR",
                  "SKALE",
                  "BASE",
                  "LINEA",
                  "SOLANA"
                ],
                "type": "string"
              }
            },
            {
              "name": "tokenType",
              "required": true,
              "in": "path",
              "schema": {
                "enum": [
                  "USDT",
                  "USDC",
                  "BINANCE_PEG_BSC_USD",
                  "CSPR",
                  "MATIC",
                  "BNB",
                  "XRP",
                  "BASE",
                  "LINEA",
                  "ETH",
                  "MEW",
                  "PARAM",
                  "SOL",
                  "PARAMT",
                  "PARAMB",
                  "BDC",
                  "RBNT",
                  "BTC"
                ],
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AnonymousCartCryptoCheckoutDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "a message consists of checkout description"
            }
          }
        }
      },
      "/v1/public/payment/{chain}": {
        "post": {
          "operationId": "PublicApiController_handleOrderPaymentPublic",
          "summary": "Send Order Payment to the Chain Network",
          "parameters": [
            {
              "name": "chain",
              "required": true,
              "in": "path",
              "example": "SOLANA",
              "schema": {
                "enum": [
                  "CASPER",
                  "POLYGON",
                  "BINANCE",
                  "REDBELLY",
                  "BITLAYER",
                  "ETH",
                  "STACKS",
                  "XRPLSIDECHAIN",
                  "NEAR",
                  "SKALE",
                  "BASE",
                  "LINEA",
                  "SOLANA"
                ],
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/OrderPaymentBodyDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": ""
            }
          }
        }
      },
      "/v1/checkout/shipping-rates/{cartId}": {
        "get": {
          "operationId": "PublicApiController_getShippingRates",
          "summary": "Get cart shipping rate based on the address",
          "parameters": [
            {
              "name": "cartId",
              "required": true,
              "in": "path",
              "description": "cart id",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "A message consists of an object describing shipping rate"
            }
          }
        },
        "post": {
          "operationId": "PublicApiController_addAnonShippingRate",
          "summary": "Add shipping rates to cart",
          "description": "Adds selected shipping rates to the cart. Updates cart with chosen shipping method and recalculates total costs.",
          "parameters": [
            {
              "name": "cartId",
              "required": true,
              "in": "path",
              "description": "Unique identifier of the cart",
              "example": "67fa3a49c5da053e89baf1ad",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "x-shop-id",
              "in": "header",
              "description": "Client ID for shop authentication",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "description": "Shipping rate details to add to cart",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SelectShippingRateVas"
                },
                "examples": {
                  "example": {
                    "summary": "Shipping Rate Selection",
                    "value": {
                      "rates": [
                        {
                          "groupId": "67fa9214c5da053e89baf843",
                          "shipmentId": "STANDARD"
                        }
                      ]
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Shipping rates successfully added to cart",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Cart"
                  }
                }
              }
            },
            "400": {
              "description": "Invalid cart ID or shipping rate data",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "statusCode": 400,
                      "message": "Invalid shipping rate data provided",
                      "error": "Bad Request"
                    }
                  }
                }
              }
            },
            "404": {
              "description": "Cart not found"
            }
          }
        }
      },
      "/v1/checkout/stripe/{cartId}": {
        "post": {
          "operationId": "PublicApiController_stripeCheckout",
          "summary": "Create Stripe payment session",
          "description": "Initializes a Stripe payment session for the cart and creates an order",
          "parameters": [
            {
              "name": "cartId",
              "required": true,
              "in": "path",
              "description": "Unique identifier of the cart",
              "example": "67fa3a49c5da053e89baf1ad",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "x-shop-id",
              "in": "header",
              "description": "Client ID for shop authentication",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/StripeCheckoutDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Stripe payment session created successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "totalPrice": 47.29,
                      "client_secret": "pi_3RD6wzJYpy7bkFtu0lHrhINP_secret_6KETz2fly5E9CqyX2jVqTbIHO",
                      "type": "stripe",
                      "orderID": "67fa952bc5da053e89baf8d5",
                      "currency": "USD",
                      "convertedAmount": 47.29,
                      "conversionRate": 1
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Invalid cart ID or email format",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "statusCode": 400,
                      "message": "Invalid email format",
                      "error": "Bad Request"
                    }
                  }
                }
              }
            },
            "404": {
              "description": "Cart not found",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "statusCode": 404,
                      "message": "Cart not found",
                      "error": "Not Found"
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/v1/order/{id}": {
        "get": {
          "operationId": "PublicApiController_publicGetOrder",
          "summary": "get order by id",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "example": "636fd84d0a7a1ec1a6d66e33",
              "description": "order id",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "a message consists of request order",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Order"
                  }
                }
              }
            }
          }
        }
      },
      "/v1/apply/giftcard": {
        "patch": {
          "operationId": "PublicApiController_applyGiftCard",
          "summary": "Apply the gift card code to the cart",
          "description": "apply the gift card code to the cart (for both non authenticated and oauth authenticated users)",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/PublicApplyGiftCardDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Apply Gift Card to Cart"
            }
          }
        }
      },
      "/v1/cart/detail/{cartId}": {
        "patch": {
          "operationId": "PublicApiController_getCartDetail",
          "summary": "Retrieve cart details and update additional details if provided",
          "description": "Fetches the cart details based on the provided cart ID and updates any additional details (email, address, note) if they are specified in the request body.",
          "parameters": [
            {
              "name": "cartId",
              "required": true,
              "in": "path",
              "description": "The unique identifier of the cart that needs to be updated.",
              "example": "628e6179e16d1959dc1a42c5",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "description": "Details to be added to the cart, including email, address ID, and an optional note.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AttachAdditionalDetailsDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Cart details retrieved and additional details updated successfully."
            },
            "400": {
              "description": "Bad Request. Cart ID is not provided or is invalid."
            }
          }
        }
      },
      "/stripe/account-onboarding": {
        "get": {
          "operationId": "StripeController_createExpressAccountOnboarding",
          "summary": "create an onboarding link for a user with a Stripe Express account",
          "parameters": [],
          "responses": {
            "200": {
              "description": "return express onboarding link"
            }
          },
          "tags": [
            "stripe"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/private/shop": {
        "get": {
          "operationId": "PrivateApiController_getShop",
          "summary": "Get shop details by private key",
          "parameters": [
            {
              "name": "x-private-key",
              "required": true,
              "in": "header",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Successfully retrieved the shop data.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ShopData"
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized, invalid or missing private key."
            }
          },
          "tags": [
            "Private"
          ]
        }
      },
      "/private/shop/currencies": {
        "get": {
          "operationId": "PrivateApiController_getCurrencies",
          "summary": "Get list of currencies supported by the shop",
          "parameters": [
            {
              "name": "x-private-key",
              "required": true,
              "in": "header",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Successfully retrieved the list of currencies.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized, invalid or missing private key."
            }
          },
          "tags": [
            "Private"
          ]
        }
      },
      "/private/payment-methods": {
        "get": {
          "operationId": "PrivateApiController_getActivePaymentMethods",
          "summary": "Get active payment methods for the shop",
          "parameters": [
            {
              "name": "x-private-key",
              "required": true,
              "in": "header",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Successfully retrieved the active payment methods.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/PaymentMethod"
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized, invalid or missing private key."
            }
          },
          "tags": [
            "Private"
          ]
        }
      },
      "/private/revenue": {
        "get": {
          "operationId": "PrivateApiController_getRevenueReport",
          "summary": "Get revenue report and active payment methods for the shop",
          "parameters": [
            {
              "name": "x-private-key",
              "required": true,
              "in": "header",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "from",
              "required": false,
              "in": "query",
              "example": "2023-11-27T00:00:00.000Z",
              "description": "date filter - from",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            },
            {
              "name": "to",
              "required": false,
              "in": "query",
              "example": "2023-11-27T23:59:59.999Z",
              "description": "date filter - to",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            },
            {
              "name": "dateRange",
              "required": false,
              "in": "query",
              "description": "Date Range",
              "schema": {
                "enum": [
                  "WEEKLY",
                  "MONTHLY",
                  "YEARLY"
                ],
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Successfully retrieved the revenue report and active payment methods.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/RevenueChartResponseDto"
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized, invalid or missing private key."
            }
          },
          "tags": [
            "Private"
          ]
        }
      },
      "/private/products": {
        "get": {
          "operationId": "PrivateApiController_findAll",
          "summary": "Retrieve your shop products",
          "parameters": [
            {
              "name": "x-private-key",
              "required": true,
              "in": "header",
              "description": "add your private key as x-private-key in the header",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "page",
              "required": true,
              "in": "query",
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "description": "number of returned products",
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "filter",
              "required": false,
              "in": "query",
              "description": "you can search in product example: filter=title:shoes",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "data": "array of products",
                      "currentPage": "number of your page",
                      "totalPages": "number of all pages",
                      "hasNextPage": "true or false",
                      "hasPreviousPage": "true or false",
                      "nextPage": "number of next page or null",
                      "previousPage": "number of prev page or null",
                      "limit": "limit",
                      "totalDocuments": "number of total docs"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Private"
          ]
        }
      },
      "/private/product": {
        "post": {
          "operationId": "PrivateApiController_createProduct",
          "summary": "Create a new product for the shop",
          "parameters": [
            {
              "name": "x-private-key",
              "required": true,
              "in": "header",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "description": "Product creation request body",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/createProductDTO"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Successfully created a new product."
            },
            "400": {
              "description": "Bad Request, invalid input data."
            },
            "401": {
              "description": "Unauthorized, invalid or missing private key."
            }
          },
          "tags": [
            "Private"
          ]
        }
      },
      "/private/product/{id}": {
        "get": {
          "operationId": "PrivateApiController_getProductById",
          "summary": "Get product details by ID for the shop",
          "parameters": [
            {
              "name": "x-private-key",
              "required": true,
              "in": "header",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Successfully retrieved the product details.",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "_id": "productId",
                      "title": "Product Title",
                      "description": "Product description",
                      "price": 100
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized, invalid or missing private key."
            },
            "404": {
              "description": "Product not found."
            }
          },
          "tags": [
            "Private"
          ]
        },
        "put": {
          "operationId": "PrivateApiController_updateProduct",
          "summary": "Update product details by ID for the shop",
          "parameters": [
            {
              "name": "x-private-key",
              "required": true,
              "in": "header",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/updateProductDTO"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Successfully updated the product details.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Product"
                  }
                }
              }
            },
            "400": {
              "description": "Bad request, invalid input data."
            },
            "401": {
              "description": "Unauthorized, invalid or missing private key."
            },
            "404": {
              "description": "Product not found."
            }
          },
          "tags": [
            "Private"
          ]
        },
        "delete": {
          "operationId": "PrivateApiController_removeProduct",
          "summary": "Remove product by ID for the shop",
          "parameters": [
            {
              "name": "x-private-key",
              "required": true,
              "in": "header",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Successfully removed the product.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Product"
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized, invalid or missing private key."
            },
            "404": {
              "description": "Product not found."
            }
          },
          "tags": [
            "Private"
          ]
        }
      },
      "/private/collection": {
        "get": {
          "operationId": "PrivateApiController_getCollections",
          "summary": "Get collections for the shop",
          "parameters": [
            {
              "name": "x-private-key",
              "required": true,
              "in": "header",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Successfully retrieved the collections."
            },
            "401": {
              "description": "Unauthorized, invalid or missing private key."
            }
          },
          "tags": [
            "Private"
          ]
        },
        "post": {
          "operationId": "PrivateApiController_createCollection",
          "summary": "Create a new collection for the shop",
          "parameters": [
            {
              "name": "x-private-key",
              "required": true,
              "in": "header",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "description": "Collection creation request body",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateCollectionDTO"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Successfully created a new collection."
            },
            "400": {
              "description": "Bad Request, invalid input data."
            },
            "401": {
              "description": "Unauthorized, invalid or missing private key."
            }
          },
          "tags": [
            "Private"
          ]
        }
      },
      "/private/collection/{id}": {
        "put": {
          "operationId": "PrivateApiController_updateCollection",
          "summary": "Update an existing collection for the shop",
          "parameters": [
            {
              "name": "x-private-key",
              "required": true,
              "in": "header",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "description": "Collection update request body",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/updateCollectionDTO"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Successfully updated the collection.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Collection"
                  }
                }
              }
            },
            "400": {
              "description": "Bad Request, invalid input data."
            },
            "401": {
              "description": "Unauthorized, invalid or missing private key."
            },
            "404": {
              "description": "Collection not found."
            }
          },
          "tags": [
            "Private"
          ]
        },
        "delete": {
          "operationId": "PrivateApiController_deleteCollection",
          "summary": "Delete a collection by ID for the shop",
          "parameters": [
            {
              "name": "x-private-key",
              "required": true,
              "in": "header",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Successfully deleted the collection.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Collection"
                  }
                }
              }
            },
            "400": {
              "description": "Bad Request, invalid input data."
            },
            "401": {
              "description": "Unauthorized, invalid or missing private key."
            },
            "404": {
              "description": "Collection not found."
            }
          },
          "tags": [
            "Private"
          ]
        }
      },
      "/private/orders": {
        "get": {
          "operationId": "PrivateApiController_getOrders",
          "summary": "Get the list of orders for the shop",
          "parameters": [
            {
              "name": "x-private-key",
              "required": true,
              "in": "header",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "page",
              "required": false,
              "in": "query",
              "example": 1,
              "description": "page",
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "example": 20,
              "description": "limit",
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "status",
              "required": false,
              "in": "query",
              "example": "INITIALIZED_FOR_PAYMENT",
              "description": "ORDER_STATUS",
              "schema": {
                "enum": [
                  "PAYMENT_CONFIRMED",
                  "WAITING_FOR_PAYMENT",
                  "WAITING_FOR_CONFIRMATION",
                  "INITIALIZED_FOR_PAYMENT",
                  "PROCESSING",
                  "SENT",
                  "CANCELED",
                  "CANCELED_PAYMENT_TIMEOUT",
                  "REFUNDED"
                ],
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Successfully retrieved the list of orders.",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "data": [
                        class Order {
}
                      ],
                      "currentPage": 1,
                      "totalPages": 10,
                      "hasNextPage": true,
                      "hasPreviousPage": false,
                      "nextPage": 2,
                      "previousPage": null,
                      "limit": 20,
                      "totalDocuments": 200
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Bad request, invalid input data."
            },
            "401": {
              "description": "Unauthorized, invalid or missing private key."
            },
            "404": {
              "description": "Orders not found."
            }
          },
          "tags": [
            "Private"
          ]
        }
      },
      "/private/order/{id}": {
        "get": {
          "operationId": "PrivateApiController_getOrderById",
          "summary": "Get order details by ID for the shop",
          "parameters": [
            {
              "name": "x-private-key",
              "required": true,
              "in": "header",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Successfully retrieved the order details.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Order"
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized, invalid or missing private key."
            },
            "404": {
              "description": "Order not found."
            }
          },
          "tags": [
            "Private"
          ]
        }
      },
      "/private/blog": {
        "post": {
          "operationId": "PrivateApiController_createBlog",
          "summary": "Create a new blog for the shop",
          "parameters": [
            {
              "name": "x-private-key",
              "required": true,
              "in": "header",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "description": "Blog creation request body",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateBlogDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Successfully created a new blog."
            },
            "400": {
              "description": "Bad Request, invalid input data."
            },
            "401": {
              "description": "Unauthorized, invalid or missing private key."
            }
          },
          "tags": [
            "Private"
          ]
        }
      },
      "/private/admins": {
        "get": {
          "operationId": "PrivateApiController_getAdmins",
          "summary": "Get list of admins for the shop",
          "parameters": [
            {
              "name": "x-private-key",
              "required": true,
              "in": "header",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Successfully retrieved the list of admins.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/Invitation"
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized, invalid or missing private key."
            },
            "404": {
              "description": "Admins not found for the shop."
            }
          },
          "tags": [
            "Private"
          ]
        }
      },
      "/private/invite": {
        "post": {
          "operationId": "PrivateApiController_inviteAdmin",
          "summary": "Invite a user as admin to the shop",
          "parameters": [
            {
              "name": "x-private-key",
              "required": true,
              "in": "header",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "description": "User invitation details",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/inviteUserDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Successfully invited the user as admin."
            },
            "400": {
              "description": "Bad Request, invalid invitation details."
            },
            "401": {
              "description": "Unauthorized, invalid or missing private key."
            }
          },
          "tags": [
            "Private"
          ]
        }
      },
      "/private/ruleset": {
        "post": {
          "operationId": "PrivateApiController_createRuleSet",
          "summary": "Create a new ruleset for the shop",
          "parameters": [
            {
              "name": "x-private-key",
              "required": true,
              "in": "header",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "description": "Create a new ruleset for the shop",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateRuleSetV2DTO"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Successfully created the ruleset.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/RuleSetV2"
                  }
                }
              }
            },
            "400": {
              "description": "Bad Request, invalid input data."
            },
            "401": {
              "description": "Unauthorized, invalid or missing private key."
            }
          },
          "tags": [
            "Private"
          ]
        },
        "get": {
          "operationId": "PrivateApiController_getRuleSets",
          "summary": "Get the list of rulesets for the shop",
          "parameters": [
            {
              "name": "x-private-key",
              "required": true,
              "in": "header",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Successfully retrieved the list of rulesets.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/RuleSetV2"
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized, invalid or missing private key."
            },
            "404": {
              "description": "Rulesets not found for the shop."
            }
          },
          "tags": [
            "Private"
          ]
        }
      },
      "/private/ruleset/{rulesetId}": {
        "get": {
          "operationId": "PrivateApiController_getRuleSetById",
          "summary": "Get a specific ruleset by its ID for the shop",
          "parameters": [
            {
              "name": "x-private-key",
              "required": true,
              "in": "header",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "rulesetId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Successfully retrieved the rule set.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/RuleSetV2"
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized, invalid or missing private key."
            },
            "404": {
              "description": "Rule set not found for the shop."
            }
          },
          "tags": [
            "Private"
          ]
        },
        "patch": {
          "operationId": "PrivateApiController_updateRuleSet",
          "summary": "Update RuleSet by ID for the shop",
          "parameters": [
            {
              "name": "x-private-key",
              "required": true,
              "in": "header",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "rulesetId",
              "required": true,
              "in": "path",
              "description": "ID of the RuleSet to update",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateRuleSetV2DTO"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Successfully updated the rule set.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/RuleSetV2"
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized, invalid or missing private key."
            },
            "404": {
              "description": "Rule set not found for the shop."
            }
          },
          "tags": [
            "Private"
          ]
        }
      },
      "/private/coupon": {
        "post": {
          "operationId": "PrivateApiController_createGiftCard",
          "summary": "Create a new gift card (coupon) for the shop",
          "parameters": [
            {
              "name": "x-private-key",
              "required": true,
              "in": "header",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "description": "Create a new gift card (coupon) for the shop",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateGiftCardDTO"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Successfully created the gift card (coupon).",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "string"
                  }
                }
              }
            },
            "400": {
              "description": "Bad Request, invalid input data."
            },
            "401": {
              "description": "Unauthorized, invalid or missing private key."
            }
          },
          "tags": [
            "Private"
          ]
        },
        "get": {
          "operationId": "PrivateApiController_getGiftCards",
          "summary": "Get the list of gift cards (coupons) for the shop",
          "parameters": [
            {
              "name": "x-private-key",
              "required": true,
              "in": "header",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "page",
              "required": false,
              "in": "query",
              "example": "1",
              "description": "page number",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "example": "20",
              "description": "limit",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "search",
              "required": false,
              "in": "query",
              "example": "summer discount",
              "description": "search in name",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Successfully retrieved the list of gift cards (coupons).",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Bad Request, invalid input data."
            },
            "401": {
              "description": "Unauthorized, invalid or missing private key."
            }
          },
          "tags": [
            "Private"
          ]
        }
      },
      "/private/quick/create/physical": {
        "post": {
          "operationId": "PrivateApiController_quickCreatePhysical",
          "summary": "Create a physical product",
          "parameters": [
            {
              "name": "x-private-key",
              "required": true,
              "in": "header",
              "description": "add your private key as x-private-key in the header",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "example": {
                    "title": "shoes",
                    "description": "<p>test</p>",
                    "media": [
                      {
                        "isMain": true,
                        "url": "https://upload-file-droplinked.s3.amazonaws.com/ee9c77c0483e5e038480fcf0f8f5bb18ae9ccec0ec49b41dbb6a4b205b0fc1f7.jpg",
                        "thumbnail": "https://upload-file-droplinked.s3.amazonaws.com/ee9c77c0483e5e038480fcf0f8f5bb18ae9ccec0ec49b41dbb6a4b205b0fc1f7_small.jpg"
                      }
                    ],
                    "sku": [
                      {
                        "externalID": "",
                        "options": [
                          {
                            "value": "#000000",
                            "variantName": "Color",
                            "caption": "Black"
                          },
                          {
                            "value": "M",
                            "variantName": "Size",
                            "caption": "M"
                          }
                        ],
                        "price": 22,
                        "quantity": 22,
                        "weight": 1,
                        "dimensions": {
                          "height": 1,
                          "length": 1,
                          "width": 1
                        },
                        "recordData": {}
                      }
                    ]
                  }
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "Private"
          ]
        }
      },
      "/private/products/{id}": {
        "get": {
          "operationId": "PrivateApiController_findOne",
          "summary": "Retrieve single product",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "product id",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "x-private-key",
              "required": true,
              "in": "header",
              "description": "add your private key as x-private-key in the header",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "returns the product",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Product"
                  }
                }
              }
            }
          },
          "tags": [
            "Private"
          ]
        }
      },
      "/private/shop/credit": {
        "get": {
          "operationId": "PrivateApiController_getShopCredit",
          "summary": "retrieve shop's credit",
          "parameters": [
            {
              "name": "x-private-key",
              "required": true,
              "in": "header",
              "description": "add your private key as x-private-key in the header",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "returns shop's credit",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "number"
                  }
                }
              }
            }
          },
          "tags": [
            "Private"
          ]
        }
      },
      "/private/shop/revenue": {
        "get": {
          "operationId": "PrivateApiController_getRevenue",
          "summary": "retrieve shop's revenue",
          "parameters": [
            {
              "name": "x-private-key",
              "required": true,
              "in": "header",
              "description": "add your private key as x-private-key in the header",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "example": {
                    "to": "2024/11/12",
                    "from": "2023/11/12"
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "returns shop's revenue",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "number"
                  }
                }
              }
            }
          },
          "tags": [
            "Private"
          ]
        }
      },
      "/private/orders/{id}": {
        "patch": {
          "operationId": "PrivateApiController_attachTrackingUrlToOrder",
          "summary": "update order tracking url",
          "parameters": [
            {
              "name": "x-private-key",
              "required": true,
              "in": "header",
              "description": "add your private key as x-private-key in the header",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "example": {
                    "url": "https://tracker-service.com/xxx"
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "returns shop's updated tracking url",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "number"
                  }
                }
              }
            }
          },
          "tags": [
            "Private"
          ]
        }
      },
      "/clarity/shop-info": {
        "get": {
          "operationId": "ClarityController_findAll",
          "summary": "get clarity data for specific shop",
          "parameters": [],
          "responses": {
            "200": {
              "description": "return Sessions, Pages per session, Active time spent, and the three countries with the most users",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Clarity"
                  }
                }
              }
            }
          },
          "tags": [
            "clarity"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/shippings": {
        "post": {
          "operationId": "ShippingController_createShipping",
          "summary": "Create New Shipping",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateShippingDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Successfuly Created",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Shipping"
                  }
                }
              }
            }
          },
          "tags": [
            "shippings"
          ],
          "security": [
            {
              "bearer": []
            },
            {
              "bearer": []
            }
          ]
        },
        "get": {
          "operationId": "ShippingController_getShippings",
          "summary": "Get Shippings",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Successfuly Founded",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/Shipping"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "shippings"
          ],
          "security": [
            {
              "bearer": []
            },
            {
              "bearer": []
            }
          ]
        }
      },
      "/shippings/{id}": {
        "put": {
          "operationId": "ShippingController_updateShipping",
          "summary": "Update Shipping",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateShippingDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Successfuly Updated",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Shipping"
                  }
                }
              }
            }
          },
          "tags": [
            "shippings"
          ],
          "security": [
            {
              "bearer": []
            },
            {
              "bearer": []
            }
          ]
        },
        "patch": {
          "operationId": "ShippingController_changeShippingStatus",
          "summary": "Change Shipping Status",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ChangeShippingStatusDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Successfuly Updated",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Shipping"
                  }
                }
              }
            }
          },
          "tags": [
            "shippings"
          ],
          "security": [
            {
              "bearer": []
            },
            {
              "bearer": []
            }
          ]
        },
        "delete": {
          "operationId": "ShippingController_deleteShipping",
          "summary": "Delete Shipping",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Successfuly Deleted",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "boolean"
                  }
                }
              }
            }
          },
          "tags": [
            "shippings"
          ],
          "security": [
            {
              "bearer": []
            },
            {
              "bearer": []
            }
          ]
        },
        "get": {
          "operationId": "ShippingController_getShipping",
          "summary": "Get Shipping",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Successfuly Founded",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Shipping"
                  }
                }
              }
            }
          },
          "tags": [
            "shippings"
          ],
          "security": [
            {
              "bearer": []
            },
            {
              "bearer": []
            }
          ]
        }
      },
      "/blockchain/chains": {
        "post": {
          "operationId": "BlockchainController_createChain",
          "summary": "Create new Chain",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateChainDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Chain created successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ChainDto"
                  }
                }
              }
            },
            "400": {
              "description": "Bad request. Invalid input data."
            },
            "500": {
              "description": "Internal server error."
            }
          },
          "tags": [
            "Blockchain"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "get": {
          "operationId": "BlockchainController_getAllChains",
          "summary": "Get all Chains",
          "parameters": [
            {
              "name": "page",
              "required": false,
              "in": "query",
              "description": "Page number",
              "example": 1,
              "schema": {
                "default": 1,
                "type": "string"
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "description": "Number of items per page",
              "example": 10,
              "schema": {
                "default": 10,
                "type": "string"
              }
            },
            {
              "name": "order",
              "required": false,
              "in": "query",
              "description": "order direction",
              "example": "desc",
              "schema": {
                "default": "desc",
                "enum": [
                  "desc",
                  "asc"
                ],
                "type": "string"
              }
            },
            {
              "name": "sort",
              "required": false,
              "in": "query",
              "description": "sort - field name",
              "example": "createdAt",
              "schema": {
                "default": "createdAt",
                "enum": [
                  "createdAt",
                  "type"
                ],
                "type": "string"
              }
            },
            {
              "name": "search",
              "required": false,
              "in": "query",
              "example": "iman",
              "description": "search term",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "from",
              "required": false,
              "in": "query",
              "example": "2023-11-27T00:00:00.000Z",
              "description": "date filter - from",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            },
            {
              "name": "to",
              "required": false,
              "in": "query",
              "example": "2023-11-27T23:59:59.999Z",
              "description": "date filter - to",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Chains retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/GetAllChainsDto"
                  }
                }
              }
            },
            "400": {
              "description": "Bad request. Invalid input data."
            },
            "500": {
              "description": "Internal server error."
            }
          },
          "tags": [
            "Blockchain"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/blockchain/chains/{id}": {
        "put": {
          "operationId": "BlockchainController_updateChain",
          "summary": "Update existing Chain",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "The id of the chain to update",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateChainDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Chain updated successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ChainDto"
                  }
                }
              }
            },
            "400": {
              "description": "Bad request. Invalid input data."
            },
            "500": {
              "description": "Internal server error."
            }
          },
          "tags": [
            "Blockchain"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "delete": {
          "operationId": "BlockchainController_deleteChain",
          "summary": "Delete existing Chain",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "The id of the chain to update",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Chain deleted successfully"
            },
            "400": {
              "description": "Bad request. Invalid input data."
            },
            "500": {
              "description": "Internal server error."
            }
          },
          "tags": [
            "Blockchain"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "get": {
          "operationId": "BlockchainController_getOneChain",
          "summary": "Get one existing Chain",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "The id of the chain to get",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Chain retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ChainDto"
                  }
                }
              }
            },
            "400": {
              "description": "Bad request. Invalid input data."
            },
            "500": {
              "description": "Internal server error."
            }
          },
          "tags": [
            "Blockchain"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/blockchain/chains/specific/{usage}": {
        "get": {
          "operationId": "BlockchainController_getChainsBasedOnUsage",
          "summary": "Get Chains based on uasge",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Chains retrieved successfully"
            },
            "400": {
              "description": "Bad request. Invalid input data."
            },
            "500": {
              "description": "Internal server error."
            }
          },
          "tags": [
            "Blockchain"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/blockchain/chains/seed": {
        "post": {
          "operationId": "BlockchainController_chainSeed",
          "summary": "Seed Chains Database",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Chain Database seeded successfully"
            },
            "400": {
              "description": "Bad request. Invalid input data."
            },
            "500": {
              "description": "Internal server error."
            }
          },
          "tags": [
            "Blockchain"
          ]
        }
      },
      "/blockchain/tokens": {
        "post": {
          "operationId": "BlockchainController_createToken",
          "summary": "Create new Token",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateTokenDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Token created successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/TokenDto"
                  }
                }
              }
            },
            "400": {
              "description": "Bad request. Invalid input data."
            },
            "500": {
              "description": "Internal server error."
            }
          },
          "tags": [
            "Blockchain"
          ]
        },
        "get": {
          "operationId": "BlockchainController_getAllToken",
          "summary": "Get all Tokens",
          "parameters": [
            {
              "name": "page",
              "required": false,
              "in": "query",
              "description": "Page number",
              "example": 1,
              "schema": {
                "default": 1,
                "type": "string"
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "description": "Number of items per page",
              "example": 10,
              "schema": {
                "default": 10,
                "type": "string"
              }
            },
            {
              "name": "order",
              "required": false,
              "in": "query",
              "description": "order direction",
              "example": "desc",
              "schema": {
                "default": "desc",
                "enum": [
                  "desc",
                  "asc"
                ],
                "type": "string"
              }
            },
            {
              "name": "sort",
              "required": false,
              "in": "query",
              "description": "sort - field name",
              "example": "createdAt",
              "schema": {
                "default": "createdAt",
                "enum": [
                  "createdAt",
                  "name",
                  "symbol"
                ],
                "type": "string"
              }
            },
            {
              "name": "search",
              "required": false,
              "in": "query",
              "example": "iman",
              "description": "search term",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "from",
              "required": false,
              "in": "query",
              "example": "2023-11-27T00:00:00.000Z",
              "description": "date filter - from",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            },
            {
              "name": "to",
              "required": false,
              "in": "query",
              "example": "2023-11-27T23:59:59.999Z",
              "description": "date filter - to",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Tokens retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/GetAllTokensDto"
                  }
                }
              }
            },
            "400": {
              "description": "Bad request. Invalid input data."
            },
            "500": {
              "description": "Internal server error."
            }
          },
          "tags": [
            "Blockchain"
          ]
        }
      },
      "/blockchain/tokens/{id}": {
        "put": {
          "operationId": "BlockchainController_updateToken",
          "summary": "Update existing Token",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "The id of the token to update",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateTokenDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Token updated successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/TokenDto"
                  }
                }
              }
            },
            "400": {
              "description": "Bad request. Invalid input data."
            },
            "500": {
              "description": "Internal server error."
            }
          },
          "tags": [
            "Blockchain"
          ]
        },
        "delete": {
          "operationId": "BlockchainController_deleteToken",
          "summary": "Delete existing Token",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "The id of the token to update",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Token deleted successfully"
            },
            "400": {
              "description": "Bad request. Invalid input data."
            },
            "500": {
              "description": "Internal server error."
            }
          },
          "tags": [
            "Blockchain"
          ]
        },
        "get": {
          "operationId": "BlockchainController_getOneToken",
          "summary": "Get one existing Token",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "The id of the token to get",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Token retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/TokenDto"
                  }
                }
              }
            },
            "400": {
              "description": "Bad request. Invalid input data."
            },
            "500": {
              "description": "Internal server error."
            }
          },
          "tags": [
            "Blockchain"
          ]
        }
      },
      "/blockchain/tokens/{id}/status": {
        "patch": {
          "operationId": "BlockchainController_updateTokenStatus",
          "summary": "Update Token Active Status",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "The id of the token to update",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateTokenStatusDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Token updated successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/TokenDto"
                  }
                }
              }
            },
            "400": {
              "description": "Bad request. Invalid input data."
            },
            "500": {
              "description": "Internal server error."
            }
          },
          "tags": [
            "Blockchain"
          ]
        }
      },
      "/blockchain/tokens/seed": {
        "post": {
          "operationId": "BlockchainController_tokenSeed",
          "summary": "Seed Tokens Database",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Token Database seeded successfully"
            },
            "400": {
              "description": "Bad request. Invalid input data."
            },
            "500": {
              "description": "Internal server error."
            }
          },
          "tags": [
            "Blockchain"
          ]
        }
      },
      "/rbac/invitations": {
        "post": {
          "operationId": "RbacController_sendInvitation",
          "summary": "send Invitation email",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/inviteUserDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "a message consists of invitation email sended"
            }
          },
          "tags": [
            "rbac"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "get": {
          "operationId": "RbacController_getInvitationInfo",
          "summary": "get Invitations info",
          "parameters": [],
          "responses": {
            "200": {
              "description": "a message consists of user successfully accepted or rejected invitation"
            }
          },
          "tags": [
            "rbac"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/rbac/separate/roles": {
        "get": {
          "operationId": "RbacController_separateRoles",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "rbac"
          ]
        }
      },
      "/rbac/invitations/{invitationId}/accept": {
        "post": {
          "operationId": "RbacController_acceptInvitation",
          "summary": "user accept invitation",
          "parameters": [
            {
              "name": "invitationId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/PasswordDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "a message consists of user successfully accept"
            }
          },
          "tags": [
            "rbac"
          ]
        }
      },
      "/rbac/invitations/{invitationId}/info": {
        "post": {
          "operationId": "RbacController_getInvitationIdInfo",
          "summary": "user can see invitation info",
          "parameters": [
            {
              "name": "invitationId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "a message consists of shop name and email for invite"
            }
          },
          "tags": [
            "rbac"
          ]
        }
      },
      "/subscription/buy": {
        "post": {
          "operationId": "SubscriptionController_chargeSubscriptionTransaction",
          "summary": "Create charge shop credit transaction",
          "description": "Creates a new subscription payment transaction for a shop. This endpoint handles the initial payment setup for subscriptions, including Stripe payment intent creation and transaction record creation. The response includes necessary payment processing details like client secret and transaction ID.",
          "parameters": [],
          "requestBody": {
            "required": true,
            "description": "Subscription creation data including month length, subscription type, and recurring payment preference",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateSubscriptionDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Returns payment processing details including transaction ID, client secret, amount, and payment intent ID",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ChargeSubscriptionResponseDto"
                  }
                }
              }
            },
            "400": {
              "description": "Invalid input data or payment processing error"
            },
            "404": {
              "description": "Shop or subscription not found"
            }
          },
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/subscription/crypto/buy/{paymentType}/{tokenType}": {
        "post": {
          "operationId": "SubscriptionController_cryptoSubscriptionTransaction",
          "summary": "Create charge shop credit transaction",
          "parameters": [
            {
              "name": "paymentType",
              "required": true,
              "in": "path",
              "schema": {
                "enum": [
                  "CASPER",
                  "POLYGON",
                  "BINANCE",
                  "REDBELLY",
                  "BITLAYER",
                  "ETH",
                  "STACKS",
                  "XRPLSIDECHAIN",
                  "NEAR",
                  "SKALE",
                  "BASE",
                  "LINEA",
                  "SOLANA"
                ],
                "type": "string"
              }
            },
            {
              "name": "tokenType",
              "required": true,
              "in": "path",
              "schema": {
                "enum": [
                  "USDT",
                  "USDC",
                  "BINANCE_PEG_BSC_USD",
                  "CSPR",
                  "MATIC",
                  "BNB",
                  "XRP",
                  "BASE",
                  "LINEA",
                  "ETH",
                  "MEW",
                  "PARAM",
                  "SOL",
                  "PARAMT",
                  "PARAMB",
                  "BDC",
                  "RBNT",
                  "BTC"
                ],
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SubscriptionCryptoDataDTO"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ChargeSubscriptionResponseDto"
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/subscription/payment/{chain}": {
        "post": {
          "operationId": "SubscriptionController_handleOrderPayment",
          "summary": "Send Transaction to Web3 Service",
          "parameters": [
            {
              "name": "chain",
              "required": true,
              "in": "path",
              "example": "SOLANA",
              "schema": {
                "enum": [
                  "CASPER",
                  "POLYGON",
                  "BINANCE",
                  "REDBELLY",
                  "BITLAYER",
                  "ETH",
                  "STACKS",
                  "XRPLSIDECHAIN",
                  "NEAR",
                  "SKALE",
                  "BASE",
                  "LINEA",
                  "SOLANA"
                ],
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SubscryptionPaymentDataDTO"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": ""
            }
          },
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/subscription/payment/chains": {
        "get": {
          "operationId": "SubscriptionController_getPaymentChain",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          }
        }
      },
      "/subscription/shop": {
        "get": {
          "operationId": "SubscriptionController_getCurrentSub",
          "summary": "get shop subscription data",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/subscription": {
        "get": {
          "operationId": "SubscriptionController_findAll",
          "summary": "get subscriptions data and options",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          }
        }
      },
      "/subscription/active/custom/enterprise": {
        "post": {
          "operationId": "SubscriptionController_activeEnterprise",
          "parameters": [],
          "responses": {
            "201": {
              "description": ""
            }
          },
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/subscription/enterprise/update-prices": {
        "post": {
          "operationId": "SubscriptionController_updateEnterprisePrices",
          "summary": "Update enterprise prices",
          "description": "Updates all enterprise subscriptions with default price if not set",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Successfully updated enterprise prices",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "matchedCount": {
                        "type": "number",
                        "description": "Number of documents matched"
                      },
                      "modifiedCount": {
                        "type": "number",
                        "description": "Number of documents modified"
                      },
                      "message": {
                        "type": "string",
                        "description": "Update status message"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/subscription/update-old-subscriptions": {
        "post": {
          "operationId": "SubscriptionController_updateOldSubscriptions",
          "summary": "Update old subscriptions",
          "description": "Updates old subscriptions with new auto-renewal fields. This endpoint should be called once after deploying the new auto-renewal feature.",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Successfully updated old subscriptions",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "description": "Update status message"
                      },
                      "updatedCount": {
                        "type": "number",
                        "description": "Number of subscriptions updated"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/subscription/test/run-cron": {
        "post": {
          "operationId": "SubscriptionController_runCronJob",
          "summary": "Run cron job manually",
          "description": "Manually triggers the subscription expiration check cron job. For testing purposes only.",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Cron job executed successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string"
                      },
                      "timestamp": {
                        "type": "string",
                        "format": "date-time"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/admin/general": {
        "get": {
          "operationId": "AdminController_generalInfo",
          "summary": "Get all the total orders, total earning, profit and ... based on start and end date.",
          "parameters": [
            {
              "name": "end",
              "required": true,
              "in": "query",
              "description": "end date",
              "example": "2024-04-23",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            },
            {
              "name": "start",
              "required": true,
              "in": "query",
              "description": "start date",
              "example": "2024-04-16",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "return general information.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/GeneralInfoResponseDto"
                  }
                }
              }
            }
          },
          "tags": [
            "admin"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/admin/shops/list": {
        "get": {
          "operationId": "AdminController_getShopsList",
          "summary": "Get list of all shops with pagination",
          "parameters": [
            {
              "name": "search",
              "required": false,
              "in": "query",
              "description": "Search by shop name",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "description": "Number of items per page (default: 10)",
              "example": 10,
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "page",
              "required": false,
              "in": "query",
              "description": "Page number (default: 1)",
              "example": 1,
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "end",
              "required": false,
              "in": "query",
              "example": "2024-04-16",
              "description": "End date for filtering",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            },
            {
              "name": "start",
              "required": false,
              "in": "query",
              "example": "2024-04-16",
              "description": "Start date for filtering",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Returns paginated list of shops",
              "schema": {
                "example": {
                  "data": [
                    {
                      "_id": "67f28a404d77d381f8379513",
                      "name": "petlink",
                      "logo": "https://upload-file-droplinked.s3.amazonaws.com/8310dcd7f34ec77cb6f1ea772324885526f7a49a08406bd754c42ccdb513ae6d.png",
                      "id": "67f28a404d77d381f8379513",
                      "url": "https://dev.droplinked.io/petlink"
                    },
                    {
                      "_id": "67f295f74d77d381f8379939",
                      "name": "sellthing",
                      "logo": "https://upload-file-droplinked.s3.amazonaws.com/7fcf9705b01e21212aeb427e43e2239a5dbfdc2ae0c218848cfd9c354d75c572.png",
                      "id": "67f295f74d77d381f8379939",
                      "url": "https://dev.droplinked.io/sellthing"
                    },
                    {
                      "_id": "67f29d504d77d381f8379a05",
                      "name": "sami-test",
                      "logo": "https://upload-file-droplinked.s3.amazonaws.com/0ef9cb6d7f894a0fbb562bb2a15357834bec3c5bf8ea35b03d99e38fccda5b58.png",
                      "id": "67f29d504d77d381f8379a05",
                      "url": "https://dev.droplinked.io/sami-test"
                    },
                    {
                      "_id": "67f3433e4d77d381f8379a54",
                      "name": "stylezone",
                      "logo": "https://upload-file-droplinked.s3.amazonaws.com/e69d3cbf723ce3b803c7f2fad2924c4de79f62782b0efc91e8827d3d5440945b.png",
                      "id": "67f3433e4d77d381f8379a54",
                      "url": "https://dev.droplinked.io/stylezone"
                    }
                  ],
                  "currentPage": 1,
                  "totalPages": 5,
                  "hasNextPage": true,
                  "hasPreviousPage": false,
                  "nextPage": 2,
                  "previousPage": null,
                  "limit": 10,
                  "totalDocuments": 45
                }
              },
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/PaginationResponseDto"
                  }
                }
              }
            }
          },
          "tags": [
            "admin"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/admin/shops/{id}/details": {
        "get": {
          "operationId": "AdminController_getShopDetails",
          "summary": "Get shop details by ID",
          "description": "Returns detailed information about a shop including orders count, products count, and subscription status",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Returns shop details",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ShopDetailsResponseDto"
                  }
                }
              }
            },
            "400": {
              "description": "Invalid shop ID"
            },
            "404": {
              "description": "Shop not found"
            }
          },
          "tags": [
            "admin"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/admin/products": {
        "get": {
          "operationId": "AdminController_productsInfo",
          "summary": "Get products info.",
          "parameters": [
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "description": "limit",
              "example": "10",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "page",
              "required": false,
              "in": "query",
              "description": "page",
              "example": "1",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "end",
              "required": true,
              "in": "query",
              "description": "end date",
              "example": "2024-04-23",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            },
            {
              "name": "start",
              "required": true,
              "in": "query",
              "description": "start date",
              "example": "2024-04-16",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "return general information about store by id."
            }
          },
          "tags": [
            "admin"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/admin/products/{id}": {
        "get": {
          "operationId": "AdminController_getProductInfoById",
          "summary": "Get product info by id.",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "end",
              "required": true,
              "in": "query",
              "description": "end date",
              "example": "2024-04-23",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            },
            {
              "name": "start",
              "required": true,
              "in": "query",
              "description": "start date",
              "example": "2024-04-16",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "return general information about store by id."
            }
          },
          "tags": [
            "admin"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/admin/orders": {
        "get": {
          "operationId": "AdminController_ordersInfo",
          "summary": "Get orders info.",
          "parameters": [
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "description": "limit",
              "example": "10",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "page",
              "required": false,
              "in": "query",
              "description": "page",
              "example": "1",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "end",
              "required": true,
              "in": "query",
              "description": "end date",
              "example": "2024-04-23",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            },
            {
              "name": "start",
              "required": true,
              "in": "query",
              "description": "start date",
              "example": "2024-04-16",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "return general information about orders."
            }
          },
          "tags": [
            "admin"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/admin/orders/{id}": {
        "get": {
          "operationId": "AdminController_orderInfo",
          "summary": "Get order info by id.",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "return general information about orders."
            }
          },
          "tags": [
            "admin"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/admin/token-based-pricing": {
        "put": {
          "operationId": "AdminController_addTokenBasedPricing",
          "summary": "add Token-Based Pricing",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AddTokenBasedPricingDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "add Token-Based Pricing for calculate products with specific token"
            }
          },
          "tags": [
            "admin"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/admin/available-collection": {
        "get": {
          "operationId": "AdminController_availableCollectionForAdmin",
          "summary": "available collection for create shop",
          "parameters": [],
          "responses": {
            "200": {
              "description": "available collection for create shop"
            }
          },
          "tags": [
            "admin"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/admin/collection": {
        "post": {
          "operationId": "AdminController_create",
          "summary": "add admin collection",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AddAdminCollectionDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "add admin collection"
            }
          },
          "tags": [
            "admin"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/admin/shops": {
        "post": {
          "operationId": "AdminController_createShopByAdmin",
          "summary": "create shop by admin",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateShopDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "create shop with product by admin"
            }
          },
          "tags": [
            "admin"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/admin/shops-insight": {
        "get": {
          "operationId": "AdminController_listShops",
          "parameters": [
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "description": "limit",
              "example": "10",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "page",
              "required": false,
              "in": "query",
              "description": "page",
              "example": "1",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "end",
              "required": true,
              "in": "query",
              "description": "end date",
              "example": "2024-04-23",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            },
            {
              "name": "start",
              "required": true,
              "in": "query",
              "description": "start date",
              "example": "2024-04-16",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "admin"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/admin/products-insight": {
        "get": {
          "operationId": "AdminController_listProducts",
          "parameters": [
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "description": "limit",
              "example": "10",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "page",
              "required": false,
              "in": "query",
              "description": "page",
              "example": "1",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "end",
              "required": true,
              "in": "query",
              "description": "end date",
              "example": "2024-04-23",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            },
            {
              "name": "start",
              "required": true,
              "in": "query",
              "description": "start date",
              "example": "2024-04-16",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "admin"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/admin/products-nft-insight": {
        "get": {
          "operationId": "AdminController_listNftProducts",
          "parameters": [
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "description": "limit",
              "example": "10",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "page",
              "required": false,
              "in": "query",
              "description": "page",
              "example": "1",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "end",
              "required": true,
              "in": "query",
              "description": "end date",
              "example": "2024-04-23",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            },
            {
              "name": "start",
              "required": true,
              "in": "query",
              "description": "start date",
              "example": "2024-04-16",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "admin"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/admin/orders-insight": {
        "get": {
          "operationId": "AdminController_listOrders",
          "parameters": [
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "description": "limit",
              "example": "10",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "page",
              "required": false,
              "in": "query",
              "description": "page",
              "example": "1",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "end",
              "required": true,
              "in": "query",
              "description": "end date",
              "example": "2024-04-23",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            },
            {
              "name": "start",
              "required": true,
              "in": "query",
              "description": "start date",
              "example": "2024-04-16",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "admin"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/admin/active/custom/enterprise": {
        "post": {
          "operationId": "AdminController_activeEnterprise",
          "summary": "Activate custom enterprise subscription for a shop",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ActiveEnterpriseDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Successfully activated custom enterprise subscription"
            }
          },
          "tags": [
            "admin"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/admin/changelog": {
        "post": {
          "operationId": "AdminController_createChangelog",
          "summary": "Create a new changelog entry",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateChangelogDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "The changelog has been successfully created.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Changelog"
                  }
                }
              }
            }
          },
          "tags": [
            "admin"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "get": {
          "operationId": "AdminController_findAllChangelog",
          "summary": "Get all changelog entries with pagination (Admin)",
          "parameters": [
            {
              "name": "page",
              "required": false,
              "in": "query",
              "example": 1,
              "description": "Page number for pagination",
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "example": 10,
              "description": "Number of items per page",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Return all changelog entries.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/PaginationResponseDto"
                  }
                }
              }
            }
          },
          "tags": [
            "admin"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/admin/public/changelog": {
        "get": {
          "operationId": "AdminController_findAllPublicChangelog",
          "summary": "Get public changelog entries with pagination",
          "parameters": [
            {
              "name": "page",
              "required": false,
              "in": "query",
              "example": 1,
              "description": "Page number for pagination",
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "example": 10,
              "description": "Number of items per page",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Return public changelog entries.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/PaginationResponseDto"
                  }
                }
              }
            }
          },
          "tags": [
            "admin"
          ]
        }
      },
      "/admin/changelog/{id}": {
        "get": {
          "operationId": "AdminController_findOneChangelog",
          "summary": "Get a changelog entry by id",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Return the changelog entry.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Changelog"
                  }
                }
              }
            }
          },
          "tags": [
            "admin"
          ]
        },
        "patch": {
          "operationId": "AdminController_updateChangelog",
          "summary": "Update a changelog entry",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateChangelogDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "The changelog has been successfully updated.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Changelog"
                  }
                }
              }
            }
          },
          "tags": [
            "admin"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "delete": {
          "operationId": "AdminController_removeChangelog",
          "summary": "Delete a changelog entry",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "The changelog has been successfully deleted.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Changelog"
                  }
                }
              }
            }
          },
          "tags": [
            "admin"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/admin/shops/adjust-credit": {
        "post": {
          "operationId": "AdminController_adjustShopCredit",
          "summary": "Adjust shop credit by shop name (Admin only)",
          "description": "Allows super admins to manually adjust a shop's credit balance. This will create a credit transaction record with type MANUAL_CREDIT_ADJUSTMENT.",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "shopName": {
                      "type": "string",
                      "example": "my-shop"
                    },
                    "amount": {
                      "type": "number",
                      "example": 100
                    },
                    "message": {
                      "type": "string",
                      "example": "Credit adjustment by admin"
                    }
                  },
                  "required": [
                    "shopName",
                    "amount",
                    "message"
                  ]
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Successfully adjusted shop credit"
            },
            "403": {
              "description": "Forbidden - Only super admins can access this endpoint"
            },
            "404": {
              "description": "Shop not found"
            }
          },
          "tags": [
            "admin"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/blogs/admin": {
        "get": {
          "operationId": "BlogController_getAdminBlogs",
          "summary": "Get all admin blogs",
          "description": "Retrieves all blogs created by admin users.",
          "parameters": [
            {
              "name": "page",
              "required": false,
              "in": "query",
              "description": "Page number (starts from 1)",
              "example": 1,
              "schema": {
                "default": 1,
                "type": "number"
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "description": "Number of items per page",
              "example": 10,
              "schema": {
                "default": 10,
                "type": "number"
              }
            },
            {
              "name": "search",
              "required": false,
              "in": "query",
              "description": "Search term for blog title",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Returns a list of admin blogs.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/BlogListResponseDto"
                  }
                }
              }
            }
          },
          "tags": [
            "blogs"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "post": {
          "operationId": "BlogController_createBlogByAdmin",
          "summary": "Create a new blog post by admin",
          "description": "Creates a new blog post by an admin user.",
          "parameters": [],
          "requestBody": {
            "required": true,
            "description": "The blog post data for admin creation",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateBlogDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "The blog post has been successfully created by admin.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Blog"
                  }
                }
              }
            }
          },
          "tags": [
            "blogs"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/blogs/admin/{id}": {
        "get": {
          "operationId": "BlogController_getAdminBlogById",
          "summary": "Get an admin blog by ID",
          "description": "Retrieves a specific admin blog by its ID.",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Returns the admin blog details.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/BlogDetailResponseDto"
                  }
                }
              }
            },
            "404": {
              "description": "Blog not found."
            }
          },
          "tags": [
            "blogs"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "put": {
          "operationId": "BlogController_updateAdminBlog",
          "summary": "Update an admin blog",
          "description": "Updates an admin blog by its ID.",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "description": "The blog data to update",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateBlogByIdDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Returns the updated admin blog.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/BlogDetailResponseDto"
                  }
                }
              }
            },
            "404": {
              "description": "Blog not found."
            }
          },
          "tags": [
            "blogs"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "delete": {
          "operationId": "BlogController_deleteAdminBlog",
          "summary": "Delete an admin blog",
          "description": "Deletes an admin blog by its ID.",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Returns the deleted admin blog.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/BlogDetailResponseDto"
                  }
                }
              }
            },
            "404": {
              "description": "Blog not found."
            }
          },
          "tags": [
            "blogs"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/blogs/public/admin": {
        "get": {
          "operationId": "BlogController_getPublicAdminBlogs",
          "summary": "Get public admin blogs",
          "description": "Retrieves all public blogs created by admin users.",
          "parameters": [
            {
              "name": "page",
              "required": false,
              "in": "query",
              "description": "Page number (starts from 1)",
              "example": 1,
              "schema": {
                "default": 1,
                "type": "number"
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "description": "Number of items per page",
              "example": 10,
              "schema": {
                "default": 10,
                "type": "number"
              }
            },
            {
              "name": "search",
              "required": false,
              "in": "query",
              "description": "Search term for blog title",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Returns a list of public admin blogs.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/BlogListResponseDto"
                  }
                }
              }
            }
          },
          "tags": [
            "blogs"
          ]
        }
      },
      "/blogs/public/admin/{slug}": {
        "get": {
          "operationId": "BlogController_getPublicAdminBlogBySlug",
          "summary": "Get a public admin blog by slug",
          "description": "Retrieves a public admin blog by its slug.",
          "parameters": [
            {
              "name": "slug",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Returns the public admin blog details.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/PublicBlogDetailResponseDto"
                  }
                }
              }
            },
            "404": {
              "description": "Blog not found."
            }
          },
          "tags": [
            "blogs"
          ]
        }
      },
      "/blogs": {
        "post": {
          "operationId": "BlogController_createBlog",
          "summary": "Create a new blog post for shop",
          "description": "Creates a new blog post for the current user's shop",
          "parameters": [],
          "requestBody": {
            "required": true,
            "description": "The blog post data",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateBlogDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "The blog post has been successfully created.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Blog"
                  }
                }
              }
            }
          },
          "tags": [
            "blogs"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "get": {
          "operationId": "BlogController_getBlogsOfShop",
          "summary": "Get all blogs of a shop with pagination and search",
          "description": "Retrieves a paginated list of all blogs belonging to the current user's shop.",
          "parameters": [
            {
              "name": "page",
              "required": false,
              "in": "query",
              "description": "Page number (starts from 1)",
              "example": 1,
              "schema": {
                "default": 1,
                "type": "number"
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "description": "Number of items per page",
              "example": 10,
              "schema": {
                "default": 10,
                "type": "number"
              }
            },
            {
              "name": "search",
              "required": false,
              "in": "query",
              "description": "Search term for blog title",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Returns a paginated list of blogs with their details.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/BlogListResponseDto"
                  }
                }
              }
            }
          },
          "tags": [
            "blogs"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/blogs/{id}": {
        "get": {
          "operationId": "BlogController_getShopBlogById",
          "summary": "Get a blog by ID",
          "description": "Retrieves a blog by its ID with all details.",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Returns the blog with all its details.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/BlogDetailResponseDto"
                  }
                }
              }
            },
            "404": {
              "description": "Blog not found."
            }
          },
          "tags": [
            "blogs"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "put": {
          "operationId": "BlogController_updateBlogById",
          "summary": "Update a blog by ID",
          "description": "Updates a blog by its ID with the provided data.",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "description": "The blog data to update",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateBlogByIdDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Returns the updated blog.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/BlogDetailResponseDto"
                  }
                }
              }
            },
            "404": {
              "description": "Blog not found."
            }
          },
          "tags": [
            "blogs"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "delete": {
          "operationId": "BlogController_deleteBlogById",
          "summary": "Delete a blog by ID",
          "description": "Deletes a blog by its ID.",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Returns the deleted blog.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/BlogDetailResponseDto"
                  }
                }
              }
            },
            "404": {
              "description": "Blog not found."
            }
          },
          "tags": [
            "blogs"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/blogs/public/shops/{shopName}": {
        "get": {
          "operationId": "BlogController_getPublicBlogsByShopName",
          "summary": "Get public blogs of a shop by name",
          "description": "Retrieves public blogs of a shop including featured, recent, and all blogs with pagination.",
          "parameters": [
            {
              "name": "shopName",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "page",
              "required": false,
              "in": "query",
              "description": "Page number (starts from 1)",
              "example": 1,
              "schema": {
                "default": 1,
                "type": "number"
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "description": "Number of items per page",
              "example": 10,
              "schema": {
                "default": 10,
                "type": "number"
              }
            },
            {
              "name": "search",
              "required": false,
              "in": "query",
              "description": "Search term for blog title",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Returns public blogs of a shop.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/PublicBlogListResponseDto"
                  }
                }
              }
            },
            "404": {
              "description": "Shop not found."
            }
          },
          "tags": [
            "blogs"
          ]
        }
      },
      "/blogs/public/{slug}": {
        "get": {
          "operationId": "BlogController_getPublicBlogBySlug",
          "summary": "Get a public blog by slug",
          "description": "Retrieves a public blog by its slug with all details.",
          "parameters": [
            {
              "name": "slug",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Returns the public blog with all its details.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/PublicBlogDetailResponseDto"
                  }
                }
              }
            },
            "404": {
              "description": "Blog not found."
            }
          },
          "tags": [
            "blogs"
          ]
        }
      },
      "/api-key": {
        "post": {
          "operationId": "ApiKeyController_create",
          "summary": "create api key.",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateApiKeyDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "create api key and set in shop.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ApiKey"
                  }
                }
              }
            }
          },
          "tags": [
            "api-key"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/api-key/check": {
        "get": {
          "operationId": "ApiKeyController_checkShopHaveApiKey",
          "summary": "check api key.",
          "parameters": [],
          "responses": {
            "200": {
              "description": "check api key and shop connected to event.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ApiKey"
                  }
                }
              }
            }
          },
          "tags": [
            "api-key"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "patch": {
          "operationId": "ApiKeyController_checkEventApiKeyIsCorrect",
          "summary": "check api key is correct.",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CheckApiKeyDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "check api key is correct.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "boolean"
                  }
                }
              }
            }
          },
          "tags": [
            "api-key"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/events/login-link": {
        "post": {
          "operationId": "EventController_getEventsLoginLink",
          "summary": "get event login link",
          "parameters": [],
          "responses": {
            "200": {
              "description": "return event login link."
            }
          },
          "tags": [
            "Event"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/events": {
        "get": {
          "operationId": "EventController_getEvents",
          "summary": "get events",
          "parameters": [],
          "responses": {
            "200": {
              "description": "return events data."
            }
          },
          "tags": [
            "Event"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/events/imports": {
        "post": {
          "operationId": "EventController_importEvents",
          "summary": "imports event from event platform",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/EventIdsDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "return events data."
            }
          },
          "tags": [
            "Event"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/events/check": {
        "patch": {
          "operationId": "EventController_checkEventProduct",
          "summary": "check event products",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/EventIdsDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "check event products"
            }
          },
          "tags": [
            "Event"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/roi/record": {
        "get": {
          "operationId": "ROIController_getRecordCosts",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          }
        }
      },
      "/gamification/categories": {
        "post": {
          "operationId": "GamificationController_createGamificationCategory",
          "summary": "Create New Gamification Category",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateGamificationCategoryDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Successfuly Created",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/GamificationCategoryDto"
                  }
                }
              }
            }
          },
          "tags": [
            "Gamification"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "get": {
          "operationId": "GamificationController_getGamificationCategories",
          "summary": "Get Gamification Categories",
          "parameters": [
            {
              "name": "page",
              "required": false,
              "in": "query",
              "description": "Page number",
              "example": 1,
              "schema": {
                "default": 1,
                "type": "string"
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "description": "Number of items per page",
              "example": 10,
              "schema": {
                "default": 10,
                "type": "string"
              }
            },
            {
              "name": "order",
              "required": false,
              "in": "query",
              "description": "order direction",
              "example": "desc",
              "schema": {
                "default": "desc",
                "enum": [
                  "desc",
                  "asc"
                ],
                "type": "string"
              }
            },
            {
              "name": "sort",
              "required": false,
              "in": "query",
              "description": "sort - field name",
              "example": "createdAt",
              "schema": {
                "default": "createdAt",
                "enum": [
                  "createdAt",
                  "name"
                ],
                "type": "string"
              }
            },
            {
              "name": "search",
              "required": false,
              "in": "query",
              "example": "iman",
              "description": "search term",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "from",
              "required": false,
              "in": "query",
              "example": "2023-11-27T00:00:00.000Z",
              "description": "date filter - from",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            },
            {
              "name": "to",
              "required": false,
              "in": "query",
              "example": "2023-11-27T23:59:59.999Z",
              "description": "date filter - to",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Successfuly Found",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/GamificationCategoryDto"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Gamification"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/gamification/categories/{id}": {
        "put": {
          "operationId": "GamificationController_updateGamificationCategory",
          "summary": "Update Gamification Category",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateGamificationCategoryDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Successfuly Updated",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/GamificationCategoryDto"
                  }
                }
              }
            }
          },
          "tags": [
            "Gamification"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "delete": {
          "operationId": "GamificationController_deleteGamificationCategory",
          "summary": "Delete Gamification Category",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Successfuly Deleted"
            }
          },
          "tags": [
            "Gamification"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "get": {
          "operationId": "GamificationController_getGamificationCategory",
          "summary": "Get Gamification Category",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Successfuly Found",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/GamificationCategoryDto"
                  }
                }
              }
            }
          },
          "tags": [
            "Gamification"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/gamification/rewards": {
        "post": {
          "operationId": "GamificationController_createGamificationReward",
          "summary": "Create New Gamification Reward",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateGamificationRewardDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Successfuly Created",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/GamificationRewardDto"
                  }
                }
              }
            }
          },
          "tags": [
            "Gamification"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "get": {
          "operationId": "GamificationController_getGamificationRewards",
          "summary": "Get Gamification Categories",
          "parameters": [
            {
              "name": "page",
              "required": false,
              "in": "query",
              "description": "Page number",
              "example": 1,
              "schema": {
                "default": 1,
                "type": "string"
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "description": "Number of items per page",
              "example": 10,
              "schema": {
                "default": 10,
                "type": "string"
              }
            },
            {
              "name": "order",
              "required": false,
              "in": "query",
              "description": "order direction",
              "example": "desc",
              "schema": {
                "default": "desc",
                "enum": [
                  "desc",
                  "asc"
                ],
                "type": "string"
              }
            },
            {
              "name": "sort",
              "required": false,
              "in": "query",
              "description": "sort - field name",
              "example": "createdAt",
              "schema": {
                "default": "createdAt",
                "enum": [
                  "createdAt",
                  "type"
                ],
                "type": "string"
              }
            },
            {
              "name": "search",
              "required": false,
              "in": "query",
              "example": "iman",
              "description": "search term",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "from",
              "required": false,
              "in": "query",
              "example": "2023-11-27T00:00:00.000Z",
              "description": "date filter - from",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            },
            {
              "name": "to",
              "required": false,
              "in": "query",
              "example": "2023-11-27T23:59:59.999Z",
              "description": "date filter - to",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Successfuly Found",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/GamificationRewardDto"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Gamification"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/gamification/rewards/{id}": {
        "put": {
          "operationId": "GamificationController_updateGamificationReward",
          "summary": "Update Gamification Reward",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateGamificationRewardDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Successfuly Updated",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/GamificationRewardDto"
                  }
                }
              }
            }
          },
          "tags": [
            "Gamification"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "delete": {
          "operationId": "GamificationController_deleteGamificationReward",
          "summary": "Delete Gamification Reward",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Successfuly Deleted"
            }
          },
          "tags": [
            "Gamification"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "get": {
          "operationId": "GamificationController_getGamificationReward",
          "summary": "Get Gamification Reward",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Successfuly Found",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/GamificationRewardDto"
                  }
                }
              }
            }
          },
          "tags": [
            "Gamification"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/gamification/missions": {
        "post": {
          "operationId": "GamificationController_createGamificationMission",
          "summary": "Create New Gamification Mission",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateGamificationMissionDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Successfuly Created",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/GamificationMissionDto"
                  }
                }
              }
            }
          },
          "tags": [
            "Gamification"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "get": {
          "operationId": "GamificationController_getGamificationMissions",
          "summary": "Get Gamification Categories",
          "parameters": [
            {
              "name": "page",
              "required": false,
              "in": "query",
              "description": "Page number",
              "example": 1,
              "schema": {
                "default": 1,
                "type": "string"
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "description": "Number of items per page",
              "example": 10,
              "schema": {
                "default": 10,
                "type": "string"
              }
            },
            {
              "name": "order",
              "required": false,
              "in": "query",
              "description": "order direction",
              "example": "desc",
              "schema": {
                "default": "desc",
                "enum": [
                  "desc",
                  "asc"
                ],
                "type": "string"
              }
            },
            {
              "name": "sort",
              "required": false,
              "in": "query",
              "description": "sort - field name",
              "example": "createdAt",
              "schema": {
                "default": "createdAt",
                "enum": [
                  "createdAt",
                  "name"
                ],
                "type": "string"
              }
            },
            {
              "name": "search",
              "required": false,
              "in": "query",
              "example": "iman",
              "description": "search term",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "from",
              "required": false,
              "in": "query",
              "example": "2023-11-27T00:00:00.000Z",
              "description": "date filter - from",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            },
            {
              "name": "to",
              "required": false,
              "in": "query",
              "example": "2023-11-27T23:59:59.999Z",
              "description": "date filter - to",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Successfuly Found",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/GamificationMissionDto"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Gamification"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/gamification/missions/{id}": {
        "put": {
          "operationId": "GamificationController_updateGamificationMission",
          "summary": "Update Gamification Mission",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateGamificationMissionDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Successfuly Updated",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/GamificationMissionDto"
                  }
                }
              }
            }
          },
          "tags": [
            "Gamification"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "delete": {
          "operationId": "GamificationController_deleteGamificationMission",
          "summary": "Delete Gamification Mission",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Successfuly Deleted"
            }
          },
          "tags": [
            "Gamification"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "get": {
          "operationId": "GamificationController_getGamificationMission",
          "summary": "Get Gamification Mission",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Successfuly Found",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/GamificationMissionDto"
                  }
                }
              }
            }
          },
          "tags": [
            "Gamification"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/gamification/participate/{missionId}": {
        "post": {
          "operationId": "GamificationController_participateInMission",
          "summary": "Participate in a mission",
          "parameters": [
            {
              "name": "missionId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "201": {
              "description": "Successfuly Participated"
            }
          },
          "tags": [
            "Gamification"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/gamification/participates": {
        "get": {
          "operationId": "GamificationController_participatedMissions",
          "summary": "Get Participated Gamification Missions",
          "parameters": [
            {
              "name": "page",
              "required": false,
              "in": "query",
              "description": "Page number",
              "example": 1,
              "schema": {
                "default": 1,
                "type": "string"
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "description": "Number of items per page",
              "example": 10,
              "schema": {
                "default": 10,
                "type": "string"
              }
            },
            {
              "name": "order",
              "required": false,
              "in": "query",
              "description": "order direction",
              "example": "desc",
              "schema": {
                "default": "desc",
                "enum": [
                  "desc",
                  "asc"
                ],
                "type": "string"
              }
            },
            {
              "name": "sort",
              "required": false,
              "in": "query",
              "description": "sort - field name",
              "example": "createdAt",
              "schema": {
                "default": "createdAt",
                "enum": [
                  "createdAt",
                  "isCompleted"
                ],
                "type": "string"
              }
            },
            {
              "name": "search",
              "required": false,
              "in": "query",
              "example": "iman",
              "description": "search term",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "from",
              "required": false,
              "in": "query",
              "example": "2023-11-27T00:00:00.000Z",
              "description": "date filter - from",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            },
            {
              "name": "to",
              "required": false,
              "in": "query",
              "example": "2023-11-27T23:59:59.999Z",
              "description": "date filter - to",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Successfuly Found",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/GamificationMissionDto"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Gamification"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/gamification/seed": {
        "post": {
          "operationId": "GamificationController_seed",
          "summary": "Seed Database",
          "parameters": [],
          "responses": {
            "201": {
              "description": "Successfuly Seeded"
            }
          },
          "tags": [
            "Gamification"
          ]
        }
      },
      "/uploader": {
        "post": {
          "operationId": "UploaderController_uploadFile",
          "parameters": [],
          "responses": {
            "201": {
              "description": ""
            }
          }
        }
      },
      "/uploader/from-urls": {
        "post": {
          "operationId": "UploaderController_uploadFromUrls",
          "parameters": [],
          "responses": {
            "201": {
              "description": ""
            }
          }
        }
      },
      "/nfts/transfer": {
        "post": {
          "operationId": "NftsController_transferNft",
          "summary": "Transfer NFT to customer",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/TransferNftDto"
                },
                "examples": {
                  "example1": {
                    "summary": "Sample transfer request",
                    "description": "Sample input to transfer an NFT to a customer",
                    "value": {
                      "transactionId": "txn_123456789",
                      "nftId": "nft_987654321"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "NFT successfully transferred to the customer",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "success": true,
                      "transactionId": "txn_123456789",
                      "nftId": "nft_987654321"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "NFTs"
          ]
        }
      },
      "/nfts/callback/transfer/{nftId}/{transactionId}": {
        "post": {
          "operationId": "NftsController_handleTransferCallback",
          "summary": "Handle Web3 callback for NFT transfer",
          "parameters": [
            {
              "name": "nftId",
              "required": true,
              "in": "path",
              "description": "ID of the NFT being transferred",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "transactionId",
              "required": true,
              "in": "path",
              "description": "Transaction ID for the NFT transfer",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "description": "Body of the callback data from Web3",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Object"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "NFTs"
          ]
        }
      },
      "/nfts/airdrop": {
        "post": {
          "operationId": "NftsController_createAirdrop",
          "summary": "Create a new Airdrop procedure",
          "parameters": [],
          "requestBody": {
            "required": true,
            "description": "Body of the callback data from Web3",
            "content": {
              "application/json": {
                "schema": {
                  "example": {
                    "tokenAddress": "0x622b08CA78655DE036593f8CfC0F33f20A868634",
                    "tokenId": "1",
                    "receivers": [
                      {
                        "receiver": "0x622b08CA78655DE036593f8CfC0F33f20A868634",
                        "amount": 1
                      }
                    ],
                    "chain": "BASE",
                    "network": "TESTNET"
                  },
                  "$ref": "#/components/schemas/CreateAirdropDTO"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Airdrop created successfully",
              "content": {
                "application/json": {
                  "example": {
                    "_id": "67a734e4a22de0c776b16473",
                    "shopId": "676a63753f682cc500aebfa3",
                    "tokenAddress": "0x622b08CA78655DE036593f8CfC0F33f20A868634",
                    "tokenId": "1",
                    "chain": "BASE",
                    "networkName": "TESTNET",
                    "receivers": [
                      {
                        "receiver": "0x622b08CA78655DE036593f8CfC0F33f20A868634",
                        "amount": 1
                      }
                    ],
                    "status": "CREATED",
                    "transactions": []
                  }
                }
              }
            },
            "400": {
              "description": "failed",
              "content": {
                "application/json": {
                  "example": {
                    "statusCode": 400,
                    "status": "failed",
                    "data": {
                      "message": "chain must be a valid enum value"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "NFTs"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/nfts/airdrop/{airdropId}": {
        "get": {
          "operationId": "NftsController_getAirdrop",
          "summary": "Get Airdrop",
          "parameters": [
            {
              "name": "airdropId",
              "required": true,
              "in": "path",
              "description": "ID of the airdrop",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Airdrop successfully retrieved",
              "content": {
                "application/json": {
                  "example": {
                    "_id": "67a734e4a22de0c776b16473",
                    "shopId": "676a63753f682cc500aebfa3",
                    "tokenAddress": "0x622b08CA78655DE036593f8CfC0F33f20A868634",
                    "tokenId": "1",
                    "chain": "BASE",
                    "networkName": "TESTNET",
                    "receivers": [
                      {
                        "receiver": "0x622b08CA78655DE036593f8CfC0F33f20A868634",
                        "amount": 1
                      }
                    ],
                    "transactions": [],
                    "status": "CREATED",
                    "__v": 0
                  }
                }
              }
            },
            "400": {
              "description": "Invalid airdrop ID or invalid/missing shop ID."
            },
            "404": {
              "description": "Airdrop not found."
            }
          },
          "tags": [
            "NFTs"
          ]
        },
        "post": {
          "operationId": "NftsController_airdropTransaction",
          "summary": "Process Airdrop transaction",
          "parameters": [
            {
              "name": "airdropId",
              "required": true,
              "in": "path",
              "description": "ID of the airdrop",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "description": "Body of the airdrop, array of transactions",
            "content": {
              "application/json": {
                "schema": {
                  "example": [
                    "0xb5fb871e29037748bcc69420db991330c8cddbe6aa2ce3c19f725e5ec4f355be",
                    "0xf73b7aa63a4016b773b561a0a439264642e2fc8c697942923232a4fdcb1a30df"
                  ]
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Airdrop successfully processed",
              "content": {
                "application/json": {
                  "example": {
                    "_id": "67a734e4a22de0c776b16473",
                    "shopId": "676a63753f682cc500aebfa3",
                    "tokenAddress": "0x622b08CA78655DE036593f8CfC0F33f20A868634",
                    "tokenId": "1",
                    "chain": "BASE",
                    "networkName": "TESTNET",
                    "receivers": [
                      {
                        "receiver": "0x622b08CA78655DE036593f8CfC0F33f20A868634",
                        "amount": 1
                      }
                    ],
                    "transactions": [
                      {
                        "deploy_hash": "0xb5fb871e29037748bcc69420db991330c8cddbe6aa2ce3c19f725e5ec4f355be",
                        "validated": false
                      },
                      {
                        "deploy_hash": "0xf73b7aa63a4016b773b561a0a439264642e2fc8c697942923232a4fdcb1a30df",
                        "validated": false
                      }
                    ],
                    "status": "PENDING",
                    "__v": 0
                  }
                }
              }
            },
            "400": {
              "description": "Bad Request. Possible reasons:\n- Airdrop is already processed.\n- Web3 transaction processing failure.\n- Invalid IDs (caught by getAirdrop)."
            },
            "401": {
              "description": "Unauthorized. The provided shopId does not match the airdrop owner (thrown by getAirdrop)."
            },
            "404": {
              "description": "Airdrop not found (thrown by getAirdrop)."
            }
          },
          "tags": [
            "NFTs"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/nfts/callback/airdrop/{airdropId}/{transactionId}": {
        "post": {
          "operationId": "NftsController_handleAirdropCallback",
          "summary": "Handle Web3 callback for NFT Airdrop",
          "parameters": [
            {
              "name": "airdropId",
              "required": true,
              "in": "path",
              "description": "ID of the Airdrop",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "transactionId",
              "required": true,
              "in": "path",
              "description": "Transaction ID for the Airdrop",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "description": "Body of the callback data from Web3",
            "content": {
              "application/json": {
                "schema": {
                  "example": {
                    "status": "SUCCESS",
                    "events": [
                      {
                        "name": "AirdropDone",
                        "details": {
                          "airdropId": "67a734e4a22de0c776b16473"
                        }
                      }
                    ]
                  }
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Callback processed successfully",
              "content": {
                "application/json": {
                  "example": {
                    "success": true,
                    "message": "Airdrop processed successfully"
                  }
                }
              }
            },
            "404": {
              "description": "Airdrop not found in the database."
            },
            "409": {
              "description": "Conflict:\n- The airdropId in the callback does not match the URL.\n- The transaction is not in the airdrop validation list."
            }
          },
          "tags": [
            "NFTs"
          ]
        }
      },
      "/nfts/import-wallets": {
        "post": {
          "operationId": "NftsController_importProductsFromCSV",
          "summary": "Import products from CSV file",
          "parameters": [],
          "requestBody": {
            "required": true,
            "description": "CSV file to import",
            "content": {
              "multipart/form-data": {
                "schema": {
                  "type": "object",
                  "required": [
                    "file"
                  ],
                  "properties": {
                    "file": {
                      "type": "string",
                      "format": "binary",
                      "description": "CSV file containing product data"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "CSV file processed successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "receivers": [
                        {
                          "receiver": "0xE256D2Bab17C64243F56A517c65f1024A0907d3e",
                          "amount": "1"
                        },
                        {
                          "receiver": "0x40DBD2c8fA183653f23DdeA47579112750d55e19",
                          "amount": "2"
                        },
                        {
                          "receiver": "0x6dcd57a5D8E1d25E653CE0B5f9291D59FA9fF7d0",
                          "amount": "3"
                        }
                      ]
                    }
                  }
                }
              }
            },
            "400": {
              "description": "CSV file is require"
            },
            "500": {
              "description": "Failed to parse CSV file"
            }
          },
          "tags": [
            "NFTs"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/nfts/retrieve": {
        "get": {
          "operationId": "NftsController_retrieveNfts",
          "summary": "get user's wallet address",
          "parameters": [
            {
              "name": "chain",
              "required": false,
              "in": "query",
              "description": "retrieve based on chain",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "wallet",
              "required": false,
              "in": "query",
              "description": "wallet address to retrieve",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "myProducts",
              "required": false,
              "in": "query",
              "description": "show droplinked products",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "search",
              "required": false,
              "in": "query",
              "description": "search string",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "user's NFTs",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "droplinkedNFTs": [
                        {
                          "image": "https://upload-file-droplinked.s3.amazonaws.com/48ea42a88d4ca1930d25dcfd69512998dd0ce67aacce90ba97189cfbce76b5da.png",
                          "name": "Bitlayer test product",
                          "chain": "BITLAYER",
                          "productAddress": "",
                          "productQuantity": 98,
                          "productPrice": 1,
                          "skus": [
                            {
                              "_id": "676a642a3f682cc500aec113",
                              "ownerID": "676a63753f682cc500aebf9f",
                              "shopIds": [
                                "676a63753f682cc500aebfa3"
                              ],
                              "recordData": {
                                "status": "RECORDED",
                                "recordNetwork": "BITLAYER",
                                "currency": "BTC",
                                "commision": 1,
                                "data": {
                                  "event_type": "ProductRegistered",
                                  "details": {
                                    "productId": "400693938981016548362234768806977521339565095299538745655565787175879524578",
                                    "amount": "100",
                                    "owner": "0xBEc8C184A8f55E6443B315361Bac3BbB2280E8E8",
                                    "uri": "https://apiv3dev.droplinked.com/sku/676a642a3f682cc500aec113/metadata"
                                  }
                                }
                              },
                              "price": 1,
                              "quantity": 98,
                              "recorded_quantity": 100,
                              "weight": null,
                              "sold_units": 2,
                              "externalID": "312",
                              "dimensions": {
                                "height": 0,
                                "length": 0,
                                "width": 0
                              },
                              "deploy_hash": "0xc67bd75c6d56ba5dda441e289535fa2d00ba4398a5ef221b83ca08874561fda4",
                              "royalty": 0,
                              "externalTicketId": null,
                              "commision": 0,
                              "partialOwners": [
                                {
                                  "user": "676a63753f682cc500aebf9f",
                                  "quantity": 98
                                }
                              ],
                              "options": [],
                              "createdAt": "2024-12-24T07:35:06.630Z",
                              "updatedAt": "2024-12-24T07:35:06.630Z",
                              "__v": 0,
                              "metadata": "{\"name\":\"Bitlayer test product\",\"description\":\"<p>test bitlayer 12</p>\",\"image\":\"https://upload-file-droplinked.s3.amazonaws.com/48ea42a88d4ca1930d25dcfd69512998dd0ce67aacce90ba97189cfbce76b5da_small.png\",\"properties\":{\"_id\":\"676a642a3f682cc500aec113\",\"price\":0,\"quantity\":100,\"externalID\":\"312\",\"options\":[],\"royalty\":0}}",
                              "metadataUrl": "https://apiv3dev.droplinked.com/sku/676a642a3f682cc500aec113/metadata",
                              "canBeAffiliated": true,
                              "deploy_hash_link": "https://testnet.btrscan.com/tx/0xc67bd75c6d56ba5dda441e289535fa2d00ba4398a5ef221b83ca08874561fda4",
                              "vas": [
                                {
                                  "name": "AFFILIATE",
                                  "costType": "USD",
                                  "value": 1,
                                  "type": "AFFILIATE",
                                  "receiver": "676a63753f682cc500aebfa3"
                                }
                              ]
                            }
                          ]
                        }
                      ],
                      "walletNFTs": [
                        {
                          "collectionName": "Cool Product Test Run 🎉",
                          "imageUrl": "https://upload-file-droplinked.s3.amazonaws.com/48ea42a88d4ca1930d25dcfd69512998dd0ce67aacce90ba97189cfbce76b5da_small.png",
                          "tokenAddress": "0xe622c633c25ce4e6eca170f6f4f5f3f00807d9a7",
                          "tokenId": "1",
                          "amount": "1",
                          "description": "<p>Experience the thrill of testing new products 🎉 - Durable design for repeated use - Compact size for easy storage - Easy to use with minimal setup - Perfect for product enthusiasts and tech-savvy individuals A must-have for anyone looking to stay ahead of the curve.</p>",
                          "tokenType": "ERC1155",
                          "chain": "POLYGON"
                        }
                      ]
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "NFTs"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/nfts/activity/{chain}/{tokenAddress}/{tokenId}": {
        "get": {
          "operationId": "NftsController_findAirdropsByToken",
          "summary": "Find airdrops by token",
          "parameters": [
            {
              "name": "chain",
              "required": true,
              "in": "path",
              "description": "The chain",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "tokenAddress",
              "required": true,
              "in": "path",
              "description": "The Ethereum token address",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "tokenId",
              "required": true,
              "in": "path",
              "description": "The token ID",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "A list of airdrops was retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      {
                        "id": "642a6f3c7c3eab12a3456789",
                        "chain": "ETH",
                        "networkName": "mainnet",
                        "receivers": [],
                        "status": "CREATED",
                        "airdropTimestamp": "2023-08-22T12:00:00Z"
                      }
                    ]
                  }
                }
              }
            },
            "400": {
              "description": "Bad Request - invalid token address or missing token ID"
            },
            "404": {
              "description": "Not Found - no airdrops were found for the specified token"
            },
            "500": {
              "description": "Internal Server Error"
            }
          },
          "tags": [
            "NFTs"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/quests/track-follow": {
        "post": {
          "operationId": "QuestsController_trackFollow",
          "summary": "Track social media follow",
          "description": "Track when a shop follows a specified social media platform",
          "parameters": [],
          "requestBody": {
            "required": true,
            "description": "Social media platform follow details",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/TrackFollowDto"
                },
                "examples": {
                  "discord": {
                    "value": {
                      "platform": "DISCORD"
                    },
                    "summary": "Track Discord follow"
                  },
                  "x": {
                    "value": {
                      "platform": "X"
                    },
                    "summary": "Track X follow"
                  },
                  "youtube": {
                    "value": {
                      "platform": "YOUTUBE"
                    },
                    "summary": "Track youtube follow"
                  },
                  "instagram": {
                    "value": {
                      "platform": "INSTAGRAM"
                    },
                    "summary": "Track instagram follow"
                  },
                  "linkedin": {
                    "value": {
                      "platform": "LINKEDIN"
                    },
                    "summary": "Track linkedin follow"
                  },
                  "telegram": {
                    "value": {
                      "platform": "TELEGRAM"
                    },
                    "summary": "Track telegram follow"
                  }
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Successfully tracked social media follow",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/SocialFollow"
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized access"
            },
            "409": {
              "description": "Platform is already followed by this shop"
            }
          },
          "tags": [
            "Social Media Quests"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/quests/grant-pro-plan": {
        "post": {
          "operationId": "QuestsController_grantProPlan",
          "summary": "Grant pro plan based on social follows",
          "description": "Upgrades shop to pro plan if they meet social follow requirements (minimum 6 platforms)",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Successfully granted pro plan"
            },
            "406": {
              "description": "Requirements not met or ineligible subscription type"
            },
            "500": {
              "description": "Failed to grant pro plan"
            }
          },
          "tags": [
            "Social Media Quests"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/quests/follow-status": {
        "get": {
          "operationId": "QuestsController_getFollowStatus",
          "summary": "Get social follow status",
          "description": "Retrieve current social media follow status for the shop",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Successfully retrieved follow status",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/SocialFollow"
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized access"
            }
          },
          "tags": [
            "Social Media Quests"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/ai/improve-title": {
        "post": {
          "operationId": "AiController_improveTitle",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ImproveTitleDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "AI"
          ]
        }
      },
      "/ai/improve-description": {
        "post": {
          "operationId": "AiController_improveDescription",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ImproveDescriptionDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "AI"
          ]
        }
      },
      "/ai/generate-title-description": {
        "post": {
          "operationId": "AiController_analyzeImage",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ImageDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "AI"
          ]
        }
      },
      "/ai/generate-hero-sections": {
        "post": {
          "operationId": "AiController_generateHeroSections",
          "summary": "Generate hero section banner images",
          "description": "Generates custom hero section banner images based on a business description and category. Limited to 3 requests per user. Uses parallel processing for faster results. Rate limited to 10 requests per minute per IP.",
          "parameters": [],
          "requestBody": {
            "required": true,
            "description": "Parameters for hero section generation",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateHeroSectionDto"
                },
                "examples": {
                  "example1": {
                    "value": {
                      "prompt": "An online bookstore specializing in rare and vintage books with a cozy, intellectual atmosphere",
                      "category": "books"
                    },
                    "summary": "Example request for a bookstore"
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Hero section images generated successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "heroSections": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        },
                        "example": [
                          "https://example.com/images/hero1.png",
                          "https://example.com/images/hero2.png",
                          "https://example.com/images/hero3.png"
                        ]
                      },
                      "fromCache": {
                        "type": "boolean",
                        "description": "Indicates if the results came from cache due to request limit",
                        "example": false
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized - JWT token is missing or invalid"
            },
            "429": {
              "description": "Too many requests",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "statusCode": 429,
                      "message": "Rate limit exceeded. Please try again later.",
                      "error": "Too Many Requests"
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Internal server error",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "statusCode": 500,
                      "message": "Failed to generate hero section images. Please try again later.",
                      "error": "Internal Server Error"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "AI"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/ai/generate-logos": {
        "post": {
          "operationId": "AiController_generateLogos",
          "summary": "Generate logo images",
          "description": "Generates custom logo images based on a business description and category. Limited to 3 requests per user. Uses parallel processing for faster results. Rate limited to 10 requests per minute per IP.",
          "parameters": [],
          "requestBody": {
            "required": true,
            "description": "Parameters for logo generation",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateLogoDto"
                },
                "examples": {
                  "example1": {
                    "value": {
                      "prompt": "A modern tech startup focused on artificial intelligence and machine learning solutions",
                      "category": "technology"
                    },
                    "summary": "Example request for a tech company"
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Logo images generated successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "logos": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        },
                        "example": [
                          "https://example.com/images/logo1.png",
                          "https://example.com/images/logo2.png",
                          "https://example.com/images/logo3.png"
                        ]
                      },
                      "fromCache": {
                        "type": "boolean",
                        "description": "Indicates if the results came from cache due to request limit",
                        "example": false
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized - JWT token is missing or invalid"
            },
            "429": {
              "description": "Too many requests",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "statusCode": 429,
                      "message": "Rate limit exceeded. Please try again later.",
                      "error": "Too Many Requests"
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Internal server error",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "statusCode": 500,
                      "message": "Failed to generate logo images. Please try again later.",
                      "error": "Internal Server Error"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "AI"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/ai/generate-shop-names": {
        "post": {
          "operationId": "AiController_generateShopNames",
          "summary": "Generate shop name suggestions",
          "description": "Generates creative shop name suggestions based on a business description. Limited to 3 requests per user. Rate limited to 10 requests per minute per IP.",
          "parameters": [],
          "requestBody": {
            "required": true,
            "description": "Parameters for shop name generation",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateShopNameDto"
                },
                "examples": {
                  "example1": {
                    "value": {
                      "prompt": "An artisanal bakery specializing in French pastries and sourdough bread"
                    },
                    "summary": "Example request for a bakery"
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Shop names generated successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "shopNames": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        },
                        "example": [
                          "Vintage Paper Tales",
                          "Bookworm Haven",
                          "Literary Treasures"
                        ]
                      },
                      "fromCache": {
                        "type": "boolean",
                        "description": "Indicates if the results came from cache due to request limit",
                        "example": false
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized - JWT token is missing or invalid"
            },
            "429": {
              "description": "Too many requests",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "statusCode": 429,
                      "message": "Rate limit exceeded. Please try again later.",
                      "error": "Too Many Requests"
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Internal server error",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "statusCode": 500,
                      "message": "Failed to generate shop names. Please try again later.",
                      "error": "Internal Server Error"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "AI"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/ai/generate-domains": {
        "post": {
          "operationId": "AiController_generateDomains",
          "summary": "Generate domain name suggestions",
          "description": "Generates unique domain name suggestions based on a business description. All suggestions are checked for uniqueness in the system. Limited to 3 requests per user. Rate limited to 10 requests per minute per IP.",
          "parameters": [],
          "requestBody": {
            "required": true,
            "description": "Parameters for domain name generation",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateDomainDto"
                },
                "examples": {
                  "example1": {
                    "value": {
                      "prompt": "A handmade jewelry store specializing in custom designs and ethically sourced gemstones"
                    },
                    "summary": "Example request for a jewelry store"
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Domain names generated successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "domains": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        },
                        "example": [
                          "frenchcorner",
                          "parisianpastries",
                          "sourdoughartisan"
                        ]
                      },
                      "fromCache": {
                        "type": "boolean",
                        "description": "Indicates if the results came from cache due to request limit",
                        "example": false
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized - JWT token is missing or invalid"
            },
            "429": {
              "description": "Too many requests",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "statusCode": 429,
                      "message": "Rate limit exceeded. Please try again later.",
                      "error": "Too Many Requests"
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Internal server error",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "statusCode": 500,
                      "message": "Failed to generate domain names. Please try again later.",
                      "error": "Internal Server Error"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "AI"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/analytics/dashboard": {
        "get": {
          "operationId": "AnalyticsController_getDashboardData",
          "summary": "Get dashboard data including shop statistics and recent orders",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Dashboard data including shop statistics and recent orders",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/DashboardData"
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            }
          },
          "tags": [
            "Analytics"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/analytics/sales-report": {
        "get": {
          "operationId": "AnalyticsController_getSalesReport",
          "summary": "Get sales report based on the specified date range",
          "parameters": [
            {
              "name": "startDate",
              "required": true,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "endDate",
              "required": true,
              "in": "query",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Sales report returned successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/SalesReport"
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            }
          },
          "tags": [
            "Analytics"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/analytics/performance-report": {
        "get": {
          "operationId": "AnalyticsController_getPerformanceReport",
          "summary": "Get sales report based on the specified date range",
          "parameters": [
            {
              "name": "startDate",
              "required": true,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "endDate",
              "required": true,
              "in": "query",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Successfully fetched shop performance data",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ShopPerformanceData"
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden"
            }
          },
          "tags": [
            "Analytics"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/analytics/top-sellers": {
        "get": {
          "operationId": "AnalyticsController_getTopSellingProducts",
          "summary": "Get the top 5 best-selling products within a specific date range",
          "parameters": [
            {
              "name": "startDate",
              "required": true,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "endDate",
              "required": true,
              "in": "query",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Successfully fetched top 5 best-selling products"
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden"
            }
          },
          "tags": [
            "Analytics"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/paymob/response": {
        "get": {
          "operationId": "PaymobController_handleResponseCallback",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "paymob"
          ]
        }
      },
      "/crawler/website": {
        "post": {
          "operationId": "CrawlerController_addWebsiteForCrawling",
          "summary": "Add website for product extraction",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "websiteUrl": {
                      "type": "string",
                      "example": "https://example-store.com"
                    }
                  },
                  "required": [
                    "websiteUrl"
                  ]
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Crawler"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/crawler/preview-urls/{poolId}": {
        "get": {
          "operationId": "CrawlerController_getCrawlerPreviewUrls",
          "summary": "Get preview URLs for a website",
          "parameters": [
            {
              "name": "poolId",
              "required": true,
              "in": "path",
              "description": "Pool ID",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Crawler"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/crawler/selected-products": {
        "post": {
          "operationId": "CrawlerController_setSelectedProductsForCrawling",
          "summary": "Set selected product URLs for crawling",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "poolId": {
                      "type": "string"
                    },
                    "selectedUrls": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    }
                  },
                  "required": [
                    "poolId",
                    "selectedUrls"
                  ]
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Crawler"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/crawler/status/{poolId}": {
        "get": {
          "operationId": "CrawlerController_getCrawlerStatus",
          "summary": "Get processing status for a website",
          "parameters": [
            {
              "name": "poolId",
              "required": true,
              "in": "path",
              "description": "Pool ID",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Crawler"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/crawler/pools/shop": {
        "get": {
          "operationId": "CrawlerController_getCrawlerPoolsByShopId",
          "summary": "Get all crawler pools for a specific shop",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Crawler"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/crawler/tasks/recent": {
        "get": {
          "operationId": "CrawlerController_getRecentCrawlerTasks",
          "summary": "Get recent crawler tasks",
          "parameters": [
            {
              "name": "limit",
              "required": true,
              "in": "query",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Crawler"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/crawler/tasks/updates": {
        "get": {
          "operationId": "CrawlerController_getTaskUpdates",
          "summary": "Get task updates since timestamp",
          "parameters": [
            {
              "name": "since",
              "required": true,
              "in": "query",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Crawler"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/crawler/process-tasks": {
        "post": {
          "operationId": "CrawlerController_processCompletedTasks",
          "summary": "Manually trigger processing of completed tasks",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Crawler"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/": {
        "get": {
          "operationId": "AppController_checkHealth",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          }
        }
      },
      "/shop/reset/cache": {
        "get": {
          "operationId": "ShopsController_resetCache",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "shops"
          ]
        }
      },
      "/shop/currency-list": {
        "get": {
          "operationId": "ShopsController_getCurrencies",
          "summary": "Get list of all currency abbreviations",
          "description": "Returns an array of currency abbreviations, e.g., [\"USD\", \"EUR\", \"JPY\", ...].",
          "parameters": [],
          "responses": {
            "200": {
              "description": "List of currency abbreviations successfully retrieved",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "statusCode": {
                        "type": "number",
                        "example": 200
                      },
                      "message": {
                        "type": "string",
                        "nullable": true,
                        "example": null
                      },
                      "data": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "example": "USD"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "shops"
          ]
        }
      },
      "/shop/public/available-payment-methods": {
        "get": {
          "operationId": "ShopsController_getListOfPaymentMethods",
          "summary": "Get list of supported payment methods .",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "shops"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/shop/public/available-payment-methodsV2": {
        "get": {
          "operationId": "ShopsController_getListOfPaymentMethodsV2",
          "summary": "Get list of supported payment methods .",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "shops"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/shop/create/extra": {
        "post": {
          "operationId": "ShopsController_createExtraShop",
          "summary": "Create extra shops",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "example": {
                    "name": "balenciaga"
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "created shop data",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Shops"
                  }
                }
              }
            }
          },
          "tags": [
            "shops"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/shop/switch": {
        "post": {
          "operationId": "ShopsController_switchShop",
          "summary": "switch shop",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "example": {
                    "shopId": "62acaca3cf66d8c0b581b69d"
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "switch shop",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Shops"
                  }
                }
              }
            }
          },
          "tags": [
            "shops"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/shop/all": {
        "get": {
          "operationId": "ShopsController_getAllShops",
          "summary": "get all shop",
          "parameters": [],
          "responses": {
            "200": {
              "description": "get all shop",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Shops"
                  }
                }
              }
            }
          },
          "tags": [
            "shops"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/shop/community/view": {
        "get": {
          "operationId": "ShopsController_getShopsConsistingRecordedProducts",
          "summary": "Get all the shops consisting recorded products on blockchain .",
          "parameters": [
            {
              "name": "name",
              "required": false,
              "in": "query",
              "description": "search by shop name",
              "example": "nike",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "tags",
              "required": false,
              "in": "query",
              "description": "search by shop tags",
              "example": [
                "tag1",
                "tag2",
                "..."
              ],
              "schema": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "page",
              "required": false,
              "in": "query",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "List of shops with affiliate products",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Shops"
                  }
                }
              }
            }
          },
          "tags": [
            "shops"
          ]
        }
      },
      "/shop/credit": {
        "get": {
          "operationId": "ShopsController_getShopCredit",
          "summary": "Get shop credit",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Returns the credit of the shop",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "number"
                  }
                }
              }
            }
          },
          "tags": [
            "shops"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/shop/community/view/products/{shopId}": {
        "get": {
          "operationId": "ShopsController_getProductsByShopName",
          "summary": "Get shops affilaited products",
          "parameters": [
            {
              "name": "shopId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "page",
              "required": false,
              "in": "query",
              "example": "1",
              "description": "page number",
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "example": "20",
              "description": "limit",
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "search",
              "required": false,
              "in": "query",
              "example": "summer discount",
              "description": "search in name",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "name",
              "required": false,
              "in": "query",
              "description": "search by shop name",
              "example": "nike",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "tags",
              "required": false,
              "in": "query",
              "description": "search by shop tags",
              "example": [
                "tag1",
                "tag2",
                "..."
              ],
              "schema": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            }
          ],
          "responses": {
            "200": {
              "description": "List of shops with affiliate products",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Shops"
                  }
                }
              }
            }
          },
          "tags": [
            "shops"
          ]
        }
      },
      "/shop/community/new": {
        "get": {
          "operationId": "ShopsController_getNewAffilaiteShops",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "shops"
          ]
        }
      },
      "/shop/check-shop-name": {
        "post": {
          "operationId": "ShopsController_checkShopName",
          "summary": "check shop name is available",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CheckShopNameDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "you can see shop name is available."
            }
          },
          "tags": [
            "shops"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/shop/public/recorded/{shopName}": {
        "get": {
          "operationId": "ShopsController_getRecordedProductsOfShop",
          "summary": "Get list of recorded products by shop name .",
          "parameters": [
            {
              "name": "shopName",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "page",
              "required": false,
              "in": "query",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "List of products recorded on blockchain in shop .",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Shops"
                  }
                }
              }
            }
          },
          "tags": [
            "shops"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/shop/public/{name}": {
        "get": {
          "operationId": "ShopsController_getShopsByNameColl",
          "summary": "get shop by name - public",
          "parameters": [
            {
              "name": "name",
              "required": true,
              "in": "path",
              "example": "nike",
              "description": "shop name",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "a message consists of requested shop",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Shops"
                  }
                }
              }
            }
          },
          "tags": [
            "shops"
          ]
        }
      },
      "/shop/payment-methods": {
        "get": {
          "operationId": "ShopsController_getPaymentMethods",
          "summary": "Get payment methods of user's shop .",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Shop with updated payment methods .",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/PaymentMethod"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "shops"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/shop": {
        "put": {
          "operationId": "ShopsController_updateShops",
          "summary": "update shop",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateShopDTO"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "a message consists of updated shop",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Shops"
                  }
                }
              }
            }
          },
          "tags": [
            "shops"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "get": {
          "operationId": "ShopsController_getShop",
          "summary": "get shop information",
          "parameters": [],
          "responses": {
            "200": {
              "description": "you can see a message that is shop",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Shops"
                  }
                }
              }
            }
          },
          "tags": [
            "shops"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/shop/{id}/shop-name": {
        "put": {
          "operationId": "ShopsController_updateShopNameById",
          "summary": "update shop name",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CheckShopNameDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "a message consists of updated shop name",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Shops"
                  }
                }
              }
            }
          },
          "tags": [
            "shops"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/shop/shops-summary": {
        "get": {
          "operationId": "ShopsController_getSalesSummary",
          "summary": "get shops summary.",
          "parameters": [
            {
              "name": "endDate",
              "required": true,
              "in": "query",
              "description": "end date",
              "example": "2024-04-23",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            },
            {
              "name": "startDate",
              "required": true,
              "in": "query",
              "description": "start date",
              "example": "2024-04-16",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "return general information about shops."
            }
          },
          "tags": [
            "shops"
          ]
        }
      },
      "/shop/{name}": {
        "get": {
          "operationId": "ShopsController_getShopsName",
          "summary": "check if shop name already exists",
          "parameters": [
            {
              "name": "name",
              "required": true,
              "in": "path",
              "example": "nike",
              "description": "shop name",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "an error, which means there is no existing shop with this name",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/NotFoundException"
                  }
                }
              }
            }
          },
          "tags": [
            "shops"
          ]
        }
      },
      "/shop/shopInfo/{name}": {
        "get": {
          "operationId": "ShopsController_getShopsByName",
          "summary": "get shop information by name",
          "parameters": [
            {
              "name": "name",
              "required": true,
              "in": "path",
              "example": "nike",
              "description": "shop name",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "you can see a message that is shop",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Shops"
                  }
                }
              }
            }
          },
          "tags": [
            "shops"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/shop/sFuelDistribution": {
        "post": {
          "operationId": "ShopsController_sFuelDistribution",
          "summary": "Skale sFuel distribution",
          "parameters": [
            {
              "name": "isTestnet",
              "required": true,
              "in": "path",
              "example": true,
              "description": "Specifies if the distribution is for testnet or not",
              "schema": {}
            },
            {
              "name": "wallet",
              "required": true,
              "in": "path",
              "example": "0xBEc8C184A8f55E6443B315361Bac3BbB2280E8E8",
              "description": "user wallet address",
              "schema": {}
            }
          ],
          "responses": {
            "200": {
              "description": "Skale sFuel distribution",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "boolean"
                  }
                }
              }
            }
          },
          "tags": [
            "shops"
          ]
        }
      },
      "/shop/{shopName}/shopify-products": {
        "get": {
          "operationId": "ShopsController_getShopifyProducts",
          "summary": "get shop products",
          "parameters": [
            {
              "name": "shopName",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "tags",
              "required": true,
              "in": "query",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "shops"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/shop/public/shops/tags": {
        "get": {
          "operationId": "ShopsController_getShopsByTags",
          "summary": "ّFind shops based on tags",
          "parameters": [
            {
              "name": "tags",
              "required": true,
              "in": "query",
              "example": "tag1,tag2,tag3",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "page",
              "required": true,
              "in": "query",
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "limit",
              "required": true,
              "in": "query",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Shops"
                  }
                }
              }
            }
          },
          "tags": [
            "shops"
          ]
        }
      },
      "/shop/available/templates": {
        "get": {
          "operationId": "ShopsController_ShopTemplates",
          "summary": "get shop template",
          "parameters": [],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/Template"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "shops"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/shop/external": {
        "put": {
          "operationId": "ShopsController_updateExternalShop",
          "summary": "Update external Shop ",
          "parameters": [
            {
              "name": "x-api-key",
              "required": true,
              "in": "header",
              "description": "Shop API Key",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateExternalShopDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Shops"
                  }
                }
              }
            }
          },
          "tags": [
            "shops"
          ]
        }
      },
      "/shop/apikey": {
        "patch": {
          "operationId": "ShopsController_generateApiKey",
          "summary": "Generate API Key",
          "parameters": [],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "string"
                  }
                }
              }
            }
          },
          "tags": [
            "shops"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/shop/external/list": {
        "get": {
          "operationId": "ShopsController_getExternalProduct",
          "parameters": [
            {
              "name": "x-api-key",
              "required": true,
              "in": "header",
              "description": "Shop API Key",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "page",
              "required": false,
              "in": "query",
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "description": "number of returned products",
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "filter",
              "required": false,
              "in": "query",
              "description": "you can search in product example: filter=title:shoes",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "shops"
          ]
        }
      },
      "/shop/credit/charge": {
        "post": {
          "operationId": "ShopsController_createChargeShopCreditTransaction",
          "summary": "Create charge shop credit transaction",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ChargeShopCreditDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ChargeShopCreditResponseDto"
                  }
                }
              }
            }
          },
          "tags": [
            "shops"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/shop/credit/transactions": {
        "get": {
          "operationId": "ShopsController_getShopCreditTransactions",
          "summary": "List of credit charge transactions",
          "parameters": [
            {
              "name": "page",
              "required": false,
              "in": "query",
              "description": "Page number",
              "example": 1,
              "schema": {
                "default": 1,
                "type": "string"
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "description": "Number of items per page",
              "example": 10,
              "schema": {
                "default": 10,
                "type": "string"
              }
            },
            {
              "name": "order",
              "required": false,
              "in": "query",
              "description": "order direction",
              "example": "desc",
              "schema": {
                "default": "desc",
                "enum": [
                  "desc",
                  "asc"
                ],
                "type": "string"
              }
            },
            {
              "name": "sort",
              "required": false,
              "in": "query",
              "description": "sort - field name",
              "example": "createdAt",
              "schema": {
                "default": "createdAt",
                "enum": [
                  "createdAt",
                  "amount"
                ],
                "type": "string"
              }
            },
            {
              "name": "search",
              "required": false,
              "in": "query",
              "example": "iman",
              "description": "search term",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "from",
              "required": false,
              "in": "query",
              "example": "2023-11-27T00:00:00.000Z",
              "description": "date filter - from",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            },
            {
              "name": "to",
              "required": false,
              "in": "query",
              "example": "2023-11-27T23:59:59.999Z",
              "description": "date filter - to",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            },
            {
              "name": "status",
              "required": false,
              "in": "query",
              "description": "status",
              "example": "PENDING",
              "schema": {
                "enum": [
                  "PENDING",
                  "SUCCESS",
                  "TIMEDOUT"
                ],
                "type": "string"
              }
            },
            {
              "name": "amount",
              "required": false,
              "in": "query",
              "description": "amount",
              "example": 1000,
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "amountType",
              "required": false,
              "in": "query",
              "description": "variation",
              "example": "INCREASED",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "type",
              "required": false,
              "in": "query",
              "description": "type",
              "example": "CREDIT_BALANCE",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/CreditTransactionsResponseDto"
                  }
                }
              }
            }
          },
          "tags": [
            "shops"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/shop/client/oauth2": {
        "put": {
          "operationId": "ShopsController_createOrUpdateShopOAuth2Client",
          "summary": "Create/Update Shop OAuth2 Client",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateOrUpdateShopOAuth2ClientDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ShopOAuth2ClientResponseDto"
                  }
                }
              }
            }
          },
          "tags": [
            "shops"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "get": {
          "operationId": "ShopsController_getShopOAuth2ClientInformation",
          "summary": "Get Shop OAuth2 Client",
          "parameters": [],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ShopOAuth2ClientResponseDto"
                  }
                }
              }
            }
          },
          "tags": [
            "shops"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/shop/dashboard/revenue": {
        "get": {
          "operationId": "ShopsController_revenueChart",
          "summary": "Revenue Chart (Chart, Report and Product Type Grid)",
          "parameters": [
            {
              "name": "from",
              "required": false,
              "in": "query",
              "example": "2023-11-27T00:00:00.000Z",
              "description": "date filter - from",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            },
            {
              "name": "to",
              "required": false,
              "in": "query",
              "example": "2023-11-27T23:59:59.999Z",
              "description": "date filter - to",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            },
            {
              "name": "dateRange",
              "required": false,
              "in": "query",
              "description": "Date Range",
              "schema": {
                "enum": [
                  "WEEKLY",
                  "MONTHLY",
                  "YEARLY"
                ],
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/RevenueChartResponseDto"
                  }
                }
              }
            }
          },
          "tags": [
            "shops"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/shop/dashboard/product-types": {
        "get": {
          "operationId": "ShopsController_productsTypeGrid",
          "summary": "Product Type Grid",
          "parameters": [
            {
              "name": "from",
              "required": false,
              "in": "query",
              "example": "2023-11-27T00:00:00.000Z",
              "description": "date filter - from",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            },
            {
              "name": "to",
              "required": false,
              "in": "query",
              "example": "2023-11-27T23:59:59.999Z",
              "description": "date filter - to",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "example": "20",
              "description": "limit",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/ProductTypesGridResponseDto"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "shops"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/shop/dashboard/products": {
        "get": {
          "operationId": "ShopsController_products",
          "summary": "Top Selling Product Table",
          "parameters": [
            {
              "name": "from",
              "required": false,
              "in": "query",
              "example": "2023-11-27T00:00:00.000Z",
              "description": "date filter - from",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            },
            {
              "name": "to",
              "required": false,
              "in": "query",
              "example": "2023-11-27T23:59:59.999Z",
              "description": "date filter - to",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "example": "20",
              "description": "limit",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/RevenueChartResponseDto"
                  }
                }
              }
            }
          },
          "tags": [
            "shops"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/shop/dashboard/sellers": {
        "get": {
          "operationId": "ShopsController_sellers",
          "summary": "Best Affiliate Partners",
          "parameters": [
            {
              "name": "from",
              "required": false,
              "in": "query",
              "example": "2023-11-27T00:00:00.000Z",
              "description": "date filter - from",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            },
            {
              "name": "to",
              "required": false,
              "in": "query",
              "example": "2023-11-27T23:59:59.999Z",
              "description": "date filter - to",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "example": "20",
              "description": "limit",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/RevenueChartResponseDto"
                  }
                }
              }
            }
          },
          "tags": [
            "shops"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/shop/dashboard/allsellers": {
        "get": {
          "operationId": "ShopsController_allSellers",
          "summary": "all Affiliate Partners",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "shops"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/shop/domain/{domain}": {
        "get": {
          "operationId": "ShopsController_findByDomain",
          "parameters": [
            {
              "name": "domain",
              "required": true,
              "in": "path",
              "description": "get shop by domain",
              "example": "shop.casperpunks.io",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "shops"
          ]
        }
      },
      "/shop/domain": {
        "post": {
          "operationId": "ShopsController_addDomain",
          "summary": "Add domain to shop",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "example": {
                    "domain": "shop.flatlay.io"
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "example": [
                      "ns-1643.awsdns-13.co.uk.",
                      "ns-250.awsdns-31.com.",
                      "ns-1078.awsdns-06.org.",
                      "ns-870.awsdns-44.net."
                    ]
                  }
                }
              }
            }
          },
          "tags": [
            "shops"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/shop/retrieve/domain/info": {
        "post": {
          "operationId": "ShopsController_retrieveInfo",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "example": {
                    "domain_name": "shop.flatlay.io"
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "example": {
                      "status": "Finalized",
                      "message": "domain setup complete"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "shops"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/shop/retrieve/dns": {
        "get": {
          "operationId": "ShopsController_getDns",
          "parameters": [],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/DNSData"
                  }
                }
              }
            }
          },
          "tags": [
            "shops"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/shop/retrieve/privatekey": {
        "get": {
          "operationId": "ShopsController_getPrivateKey",
          "parameters": [],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "string"
                  }
                }
              }
            }
          },
          "tags": [
            "shops"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/shop/generate/privatekey/for/old/shops": {
        "get": {
          "operationId": "ShopsController_generatePrivateKey",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "shops"
          ]
        }
      },
      "/shop/add/login/methods/to/old/shops": {
        "get": {
          "operationId": "ShopsController_addLoginMethod",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "shops"
          ]
        }
      },
      "/shop/modify/custom/domains": {
        "get": {
          "operationId": "ShopsController_modifyCustomDomain",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "shops"
          ]
        }
      },
      "/shop/referral/custom/code": {
        "patch": {
          "operationId": "ShopsController_updateReferralCustomCode",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateReferralCustomCodeDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "string"
                  }
                }
              }
            }
          },
          "tags": [
            "shops"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/shop/referral/custom/code/availability/{code}": {
        "get": {
          "operationId": "ShopsController_checkReferralCodeAvailability",
          "parameters": [
            {
              "name": "code",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "string"
                  }
                }
              }
            }
          },
          "tags": [
            "shops"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/shop/referral/report": {
        "get": {
          "operationId": "ShopsController_getReferralReport",
          "parameters": [
            {
              "name": "page",
              "required": false,
              "in": "query",
              "example": 1,
              "description": "page",
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "example": 20,
              "description": "limit",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "string"
                  }
                }
              }
            }
          },
          "tags": [
            "shops"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/shop/modify/referral": {
        "get": {
          "operationId": "ShopsController_modifyReferral",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "shops"
          ]
        }
      },
      "/shop/modify/referral/percent": {
        "get": {
          "operationId": "ShopsController_modifyReferralPercent",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "shops"
          ]
        }
      },
      "/shop/query/payment-methods": {
        "get": {
          "operationId": "ShopsController_paymentMethodsQuery",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "shops"
          ]
        }
      },
      "/shop/contract/deploy": {
        "patch": {
          "operationId": "ShopsController_deployShopContract",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DeployShopContract"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "string"
                  }
                }
              }
            }
          },
          "tags": [
            "shops"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/shop/add/shop/id/refferal": {
        "get": {
          "operationId": "ShopsController_addShopIdRefferal",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "shops"
          ]
        }
      },
      "/shop/delete-amo-aref/{email}": {
        "get": {
          "operationId": "ShopsController_deleteAmoAref",
          "parameters": [
            {
              "name": "email",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "string"
                  }
                }
              }
            }
          },
          "tags": [
            "shops"
          ]
        }
      },
      "/shop/update/product-link-options": {
        "patch": {
          "operationId": "ShopsController_updateProductOptions",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateProductLinkOptionsDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "string"
                  }
                }
              }
            }
          },
          "tags": [
            "shops"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/shop/query/shop/product-link-options": {
        "patch": {
          "operationId": "ShopsController_queryUpdateProductOptions",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "shops"
          ]
        }
      },
      "/shop/deploy/skale": {
        "post": {
          "operationId": "ShopsController_deployShopOnSkale",
          "summary": "",
          "description": "whitelist skale address ",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "example": {
                    "walletAddress": "send the address if your SKALE wallet is not connected "
                  }
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "shops"
          ]
        }
      },
      "/shop/growth/list": {
        "get": {
          "operationId": "ShopsController_growthList",
          "summary": "",
          "description": "Get Growth List",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "shops"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/shop/circle/wallet": {
        "post": {
          "operationId": "ShopsController_createCircleWallet",
          "summary": "",
          "description": "Create circle wallet",
          "parameters": [],
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "shops"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "get": {
          "operationId": "ShopsController_getCircleWallet",
          "summary": "",
          "description": "Get circle wallet balance",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "shops"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/shop/circle/deploy": {
        "post": {
          "operationId": "ShopsController_deployCircleShopContract",
          "summary": "",
          "description": "Deploy circle shop contract",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CircleDeployShopContractDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "shops"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/shop/circle/deploy/estimate": {
        "post": {
          "operationId": "ShopsController_estimateDeployCircleShopContractEstimate",
          "summary": "",
          "description": "Deploy circle shop contract",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CircleDeployShopContractDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "shops"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/shop/circle/withdraw": {
        "post": {
          "operationId": "ShopsController_withdrawCircle",
          "summary": "",
          "description": "Withdraw",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CircleWithdrawDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "shops"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/shop/circle/withdraw/estimate": {
        "post": {
          "operationId": "ShopsController_estimateWithdrawCircle",
          "summary": "",
          "description": "Withdraw",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CircleWithdrawDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "shops"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/shop/circle/credit/withdraw": {
        "post": {
          "operationId": "ShopsController_withdrawCircleCredit",
          "summary": "",
          "description": "Withdraw",
          "parameters": [],
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "shops"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/shop/circle/credit/withdraw/estimate": {
        "post": {
          "operationId": "ShopsController_estimateWithdrawCircleCredit",
          "summary": "",
          "description": "Withdraw",
          "parameters": [],
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "shops"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/shop/credit/analytics": {
        "get": {
          "operationId": "ShopsController_getCreditAnalytics",
          "summary": "Get credit analytics within date range",
          "description": "\n      Retrieves aggregated credit analytics data for a shop within the specified date range.\n      Includes detailed breakdown of credit additions and removals by transaction type.\n      Results are filtered by shop ID from the authenticated user's context.\n    ",
          "parameters": [
            {
              "name": "startDate",
              "required": true,
              "in": "query",
              "description": "Start date in ISO format (YYYY-MM-DDTHH:mm:ss.sssZ)",
              "example": "2024-01-01T00:00:00.000Z",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            },
            {
              "name": "endDate",
              "required": true,
              "in": "query",
              "description": "End date in ISO format (YYYY-MM-DDTHH:mm:ss.sssZ)",
              "example": "2024-12-31T23:59:59.999Z",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            },
            {
              "name": "page",
              "required": false,
              "in": "query",
              "description": "Page number for pagination",
              "example": 1,
              "schema": {
                "minimum": 1,
                "default": 1,
                "type": "number"
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "description": "Number of items per page",
              "example": 20,
              "schema": {
                "minimum": 1,
                "default": 20,
                "type": "number"
              }
            },
            {
              "name": "type",
              "required": false,
              "in": "query",
              "description": "Filter by credit transaction type",
              "example": "ORDER",
              "schema": {
                "$ref": "#/components/schemas/ShopCreditType"
              }
            },
            {
              "name": "amountType",
              "required": false,
              "in": "query",
              "description": "Filter by credit amount type (increase/decrease)",
              "example": "INCREASE",
              "schema": {
                "$ref": "#/components/schemas/ShopCreditAmountType"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Credit analytics retrieved successfully",
              "schema": {
                "$ref": "#/components/schemas/CreditAnalyticsResponseDto"
              },
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/CreditAnalyticsResponseDto"
                  }
                }
              }
            },
            "400": {
              "description": "Invalid request parameters",
              "content": {
                "application/json": {
                  "examples": {
                    "Invalid Date Format": {
                      "value": {
                        "statusCode": 400,
                        "message": "Invalid date format. Use ISO format (YYYY-MM-DDTHH:mm:ss.sssZ)",
                        "error": "Bad Request"
                      }
                    },
                    "Invalid Date Range": {
                      "value": {
                        "statusCode": 400,
                        "message": "End date must be after start date",
                        "error": "Bad Request"
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "JWT token is missing or invalid",
              "content": {
                "application/json": {
                  "example": {
                    "statusCode": 401,
                    "message": "Unauthorized",
                    "error": "Unauthorized"
                  }
                }
              }
            },
            "403": {
              "description": "User lacks required roles (PRODUCER or ADMIN)",
              "content": {
                "application/json": {
                  "example": {
                    "statusCode": 403,
                    "message": "User does not have required roles",
                    "error": "Forbidden"
                  }
                }
              }
            }
          },
          "tags": [
            "shops"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/shop/credit/transactions/detailed": {
        "get": {
          "operationId": "ShopsController_getDetailedCreditTransactions",
          "summary": "Get detailed credit transactions within date range",
          "description": "\n      Retrieves detailed credit transaction records with pagination and filtering options.\n      Results are filtered by shop ID from the authenticated user's context.\n      Supports filtering by transaction type and amount type.\n      Returns a paginated response with navigation metadata.\n    ",
          "parameters": [
            {
              "name": "startDate",
              "required": true,
              "in": "query",
              "description": "Start date in ISO format (YYYY-MM-DDTHH:mm:ss.sssZ)",
              "example": "2024-01-01T00:00:00.000Z",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            },
            {
              "name": "endDate",
              "required": true,
              "in": "query",
              "description": "End date in ISO format (YYYY-MM-DDTHH:mm:ss.sssZ)",
              "example": "2024-12-31T23:59:59.999Z",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            },
            {
              "name": "page",
              "required": false,
              "in": "query",
              "description": "Page number for pagination (minimum: 1)",
              "example": 1,
              "schema": {
                "minimum": 1,
                "default": 1,
                "type": "number"
              }
            },
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "description": "Number of items per page (minimum: 1)",
              "example": 20,
              "schema": {
                "minimum": 1,
                "default": 20,
                "type": "number"
              }
            },
            {
              "name": "type",
              "required": false,
              "in": "query",
              "description": "Filter by credit transaction type",
              "example": "ORDER",
              "schema": {
                "$ref": "#/components/schemas/ShopCreditType"
              }
            },
            {
              "name": "amountType",
              "required": false,
              "in": "query",
              "description": "Filter by credit amount type (INCREASE/DECREASE)",
              "example": "INCREASE",
              "schema": {
                "$ref": "#/components/schemas/ShopCreditAmountType"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Credit transactions retrieved successfully",
              "schema": {
                "$ref": "#/components/schemas/CreditTransactionsResponseDto"
              },
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/CreditTransactionsResponseDto"
                  }
                }
              }
            },
            "400": {
              "description": "Invalid request parameters",
              "content": {
                "application/json": {
                  "examples": {
                    "Invalid Date Format": {
                      "value": {
                        "statusCode": 400,
                        "message": "Invalid date format. Use ISO format (YYYY-MM-DDTHH:mm:ss.sssZ)",
                        "error": "Bad Request"
                      }
                    },
                    "Invalid Pagination": {
                      "value": {
                        "statusCode": 400,
                        "message": "Page and limit must be positive numbers",
                        "error": "Bad Request"
                      }
                    },
                    "Invalid Type": {
                      "value": {
                        "statusCode": 400,
                        "message": "Invalid transaction type",
                        "error": "Bad Request"
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "JWT token is missing or invalid"
            },
            "403": {
              "description": "User lacks required roles (PRODUCER or ADMIN)"
            }
          },
          "tags": [
            "shops"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/shop/credit/transaction-types": {
        "get": {
          "operationId": "ShopsController_getAvailableTransactionTypes",
          "summary": "Get available credit transaction types",
          "description": "Returns lists of transaction types and amount types that exist in the database",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Available transaction types retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "types": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "enum": [
                            "ORDER",
                            "CREDIT_BALANCE",
                            "AFFILIATE_SHARE",
                            "SUBSCRIPTION_UPDATE",
                            "GAMIFICATION_REWARD",
                            "WITHDRAW",
                            "REFERRAL",
                            "CUSTOMER_SUPPORT_FEE",
                            "BULK_ORDER",
                            "MANUAL_CREDIT_ADJUSTMENT",
                            "SUBSCRIPTION_RENEWAL"
                          ]
                        },
                        "description": "List of transaction types that have records"
                      },
                      "amountTypes": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "enum": [
                            "INCREASE",
                            "DECREASE"
                          ]
                        },
                        "description": "List of amount types that have records"
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "shops"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/shop/setup": {
        "post": {
          "operationId": "ShopsController_setupShop",
          "summary": "Setup existing shop with all required details in one step",
          "description": "Update a shop with name, URL, logo, hero section, and description. This endpoint allows users to fully set up their shop in a single API call after registration. Shop URL must be unique, and the name is required. Other fields are optional.",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ShopSetupDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Shop updated successfully with all provided information",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Shops"
                  }
                }
              }
            },
            "400": {
              "description": "Invalid input - Shop name is missing or field validation failed"
            },
            "401": {
              "description": "Unauthorized - Valid authentication token required"
            },
            "404": {
              "description": "Shop not found for this user"
            },
            "409": {
              "description": "Shop URL already in use - Please choose a different URL"
            }
          },
          "tags": [
            "shops"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/address-book": {
        "post": {
          "operationId": "AddressBooksController_createAddressBooks",
          "summary": "create address book",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/createAddressBooksDTO"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "a message consists of created address book",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/AddressBooks"
                  }
                }
              }
            }
          },
          "tags": [
            "address-book"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "get": {
          "operationId": "AddressBooksController_getAddressBooks",
          "summary": "get user's address books",
          "parameters": [],
          "responses": {
            "200": {
              "description": "a message consists of user address books",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/AddressBooks"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "address-book"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/address-book/public/anonymous-customer": {
        "post": {
          "operationId": "AddressBooksController_createPublicAddressBook",
          "summary": "create address book ",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/createAddressBooksDTO"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "A message consist of created address book .",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/AddressBooks"
                  }
                }
              }
            }
          },
          "tags": [
            "address-book"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/address-book/shop": {
        "get": {
          "operationId": "AddressBooksController_getShopAddressBooks",
          "summary": "get shop address books",
          "parameters": [],
          "responses": {
            "200": {
              "description": "a message consists of shop address books",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/AddressBooks"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "address-book"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/address-book/shipping": {
        "get": {
          "operationId": "AddressBooksController_getShippingAddressBook",
          "summary": "get Shipping address books",
          "parameters": [],
          "responses": {
            "200": {
              "description": "a message consists of user address books",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/AddressBooks"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "address-book"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/address-book/{id}": {
        "delete": {
          "operationId": "AddressBooksController_deleteAddressBooks",
          "summary": "delete address book by id",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "example": "62acaca3cf66d8c0b581b69d",
              "description": "address book id",
              "schema": {}
            }
          ],
          "responses": {
            "200": {
              "description": "a message consists of deleted address book",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/AddressBooks"
                  }
                }
              }
            }
          },
          "tags": [
            "address-book"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "get": {
          "operationId": "AddressBooksController_getAddressBook",
          "summary": "get address book by id",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "example": "62acaca3cf66d8c0b581b69d",
              "description": "address book id",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "a message consists of requested address book",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/AddressBooks"
                  }
                }
              }
            }
          },
          "tags": [
            "address-book"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "put": {
          "operationId": "AddressBooksController_updateAddressBook",
          "summary": "update address book by id",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "example": "62acaca3cf66d8c0b581b69d",
              "description": "address book id",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/createAddressBooksDTO"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "a message consists of updated address book",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/createAddressBooksDTO"
                  }
                }
              }
            }
          },
          "tags": [
            "address-book"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/address-book/add/shop/id": {
        "get": {
          "operationId": "AddressBooksController_addShopId",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "address-book"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      }
    },
    "info": {
      "title": "Droplinked APIs",
      "description": "All APIs are here now.",
      "version": "1.2",
      "contact": {}
    },
    "tags": [
      {
        "name": "droplinked",
        "description": ""
      }
    ],
    "servers": [],
    "components": {
      "securitySchemes": {
        "bearer": {
          "scheme": "bearer",
          "bearerFormat": "JWT",
          "type": "http"
        }
      },
      "schemas": {
        "ForgotPasswordDTO": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string",
              "example": "username@example.com"
            }
          },
          "required": [
            "email"
          ]
        },
        "resendEmailVerificationDTO": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string",
              "example": "email@example.com"
            }
          },
          "required": [
            "email"
          ]
        },
        "EmailVerificationDto": {
          "type": "object",
          "properties": {
            "token": {
              "type": "string",
              "example": "email verification token"
            }
          },
          "required": [
            "token"
          ]
        },
        "EmailVerificationCodeDto": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string",
              "example": "user@example.com",
              "description": "User email address"
            },
            "code": {
              "type": "string",
              "example": "123456",
              "description": "6-digit verification code"
            }
          },
          "required": [
            "email",
            "code"
          ]
        },
        "RecoveryAccountDTO": {
          "type": "object",
          "properties": {
            "newPassword": {
              "type": "string",
              "example": "test1234"
            },
            "accountRecoveryToken": {
              "type": "string",
              "example": "xxxx-xxxx-xxxx-xxxx@1234567890"
            }
          },
          "required": [
            "newPassword",
            "accountRecoveryToken"
          ]
        },
        "User": {
          "type": "object",
          "properties": {
            "firstname": {
              "type": "string",
              "example": "Bob",
              "description": "it is a first name"
            },
            "lastname": {
              "type": "string",
              "example": "Wang",
              "description": "it is a last name"
            },
            "email": {
              "type": "string",
              "example": "example@email.com",
              "description": "it is an email"
            },
            "customerShop": {
              "type": "string",
              "description": "it is customer of a shop"
            },
            "emailVerificationToken": {
              "type": "string",
              "description": "it is a token for verify user after verifing"
            },
            "verificationCode": {
              "type": "string",
              "description": "it is a 6-digit verification code for email verification"
            },
            "verificationCodeExpires": {
              "format": "date-time",
              "type": "string",
              "description": "it is the expiration time for the verification code"
            },
            "accountRecoveryToken": {
              "type": "string",
              "description": "it is a token for recovery user account"
            },
            "sessionValidationKey": {
              "type": "string",
              "description": "it is a session validation key"
            },
            "avatar": {
              "type": "string",
              "description": "it is an avatar"
            },
            "status": {
              "type": "string",
              "example": "IMS_TYPE_COMPLETED",
              "description": "it is a status of user"
            },
            "type": {
              "type": "string",
              "example": "SHOPBUILDER",
              "description": "it is a type of user"
            },
            "roles": {
              "example": "id of role",
              "description": "user roles",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "phone": {
              "type": "string",
              "example": "1234542453",
              "description": "it is a phone number"
            },
            "stacksAddress": {
              "type": "string",
              "description": "it is a Stack wallet address"
            },
            "ETHAddress": {
              "type": "string",
              "description": "it is an Ethereum wallet address"
            },
            "casperAddress": {
              "type": "string",
              "description": "it is a Casper wallet address"
            },
            "skaleAddress": {
              "type": "string",
              "description": "it is a SKALE wallet address"
            },
            "unstoppableDomainAddress": {
              "type": "string",
              "description": "it is a Unstoppable Domain wallet address"
            },
            "hederaAddress": {
              "type": "string",
              "description": "it is a Hedera wallet address"
            },
            "unisatAddress": {
              "type": "string",
              "description": "it is a Unisat wallet address"
            },
            "polygonAddress": {
              "type": "string",
              "description": "it is a Polygon wallet address"
            },
            "binanceAddress": {
              "type": "string",
              "description": "it is a Binance wallet address"
            },
            "redbellyAddress": {
              "type": "string",
              "description": "it is a Redbelly wallet address"
            },
            "bitlayerAddress": {
              "type": "string",
              "description": "it is a Bitlayer wallet address"
            },
            "lineaAddress": {
              "type": "string",
              "description": "it is a Linea wallet address"
            },
            "baseAddress": {
              "type": "string",
              "description": "it is a Base wallet address"
            },
            "nearAddress": {
              "type": "string",
              "description": "it is a NEAR wallet address"
            },
            "rippleAddress": {
              "type": "string",
              "description": "it is a Ripple wallet address"
            },
            "xrplSidechainAddress": {
              "type": "string",
              "description": "it is a XrplSidechain wallet address"
            },
            "xummAddress": {
              "type": "string",
              "description": "it is a Xumm wallet address"
            },
            "xverseAddress": {
              "type": "string",
              "description": "it is a Xverse wallet address"
            },
            "solanaAddress": {
              "type": "string",
              "description": "it is a Solana wallet address"
            },
            "wallets": {
              "description": "it is an array of wallet addresses",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "stripeCustomerID": {
              "type": "string",
              "description": "it is a stripe customer ID"
            },
            "emailNotificationEnabled": {
              "type": "boolean",
              "description": "it is a status for check notification user is enable or not"
            }
          },
          "required": [
            "firstname",
            "lastname",
            "email",
            "customerShop",
            "emailVerificationToken",
            "verificationCode",
            "verificationCodeExpires",
            "accountRecoveryToken",
            "sessionValidationKey",
            "avatar",
            "status",
            "type",
            "roles",
            "phone",
            "stacksAddress",
            "ETHAddress",
            "casperAddress",
            "skaleAddress",
            "unstoppableDomainAddress",
            "hederaAddress",
            "unisatAddress",
            "polygonAddress",
            "binanceAddress",
            "redbellyAddress",
            "bitlayerAddress",
            "lineaAddress",
            "baseAddress",
            "nearAddress",
            "rippleAddress",
            "xrplSidechainAddress",
            "xummAddress",
            "xverseAddress",
            "solanaAddress",
            "wallets",
            "stripeCustomerID",
            "emailNotificationEnabled"
          ]
        },
        "updateProfile": {
          "type": "object",
          "properties": {
            "firstname": {
              "type": "string",
              "description": "first name"
            },
            "customerShop": {
              "type": "string",
              "description": "you must determine the which shop you want to update the profile"
            },
            "lastname": {
              "type": "string",
              "description": "last name"
            },
            "avatar": {
              "type": "string",
              "description": "avatar url"
            },
            "email": {
              "type": "string",
              "description": "email"
            },
            "phone": {
              "type": "string",
              "description": "phone number"
            },
            "casperAddress": {
              "type": "string",
              "description": "Casper Address"
            },
            "stacksAddress": {
              "type": "string",
              "description": "Stack Address"
            },
            "ETHAddress": {
              "type": "string",
              "description": "Ethereum Address"
            },
            "skaleAddress": {
              "type": "string",
              "description": "SKALE Address"
            },
            "unstoppableDomainAddress": {
              "type": "string",
              "description": "Unstoppable Domain Address"
            },
            "hederaAddress": {
              "type": "string",
              "description": "Hedera Address"
            },
            "unisatAddress": {
              "type": "string",
              "description": "Unisat Address"
            },
            "polygonAddress": {
              "type": "string",
              "description": "Polygon Address"
            },
            "binanceAddress": {
              "type": "string",
              "description": "Binance Address"
            },
            "redbellyAddress": {
              "type": "string",
              "description": "Redbelly Address"
            },
            "bitlayerAddress": {
              "type": "string",
              "description": "Bitlayer Address"
            },
            "lineaAddress": {
              "type": "string",
              "description": "Linea Address"
            },
            "baseAddress": {
              "type": "string",
              "description": "Base Address"
            },
            "nearAddress": {
              "type": "string",
              "description": "Near Address"
            },
            "wallets": {
              "description": "wallet addresses and types",
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          "required": [
            "firstname",
            "customerShop",
            "lastname",
            "avatar",
            "email",
            "phone",
            "casperAddress",
            "stacksAddress",
            "ETHAddress",
            "skaleAddress",
            "unstoppableDomainAddress",
            "hederaAddress",
            "unisatAddress",
            "polygonAddress",
            "binanceAddress",
            "redbellyAddress",
            "bitlayerAddress",
            "lineaAddress",
            "baseAddress",
            "nearAddress",
            "wallets"
          ]
        },
        "RegisterDto": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string",
              "example": "username@example.com"
            },
            "password": {
              "type": "string",
              "example": "Password@1234"
            },
            "customerShop": {
              "type": "string",
              "example": "testShop",
              "default": "DEFUALT_DROPLINKED",
              "description": "If the user wants to register at any shop as a customer, they must add this field; otherwise, the default value is \"DEFAULT_DROPLINKED\""
            },
            "hasProducerAccount": {
              "type": "boolean",
              "example": true,
              "description": "If you want to create producer account you must add this field."
            },
            "referralCode": {
              "type": "string",
              "example": "samplecode"
            }
          },
          "required": [
            "email",
            "password"
          ]
        },
        "LoginUserDto": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string",
              "example": "username@example.com"
            },
            "password": {
              "type": "string",
              "example": "Password@1234"
            },
            "userType": {
              "type": "string",
              "example": "PRODUCER",
              "enum": [
                "PRODUCER",
                "CUSTOMER",
                "SUPER_ADMIN"
              ]
            }
          },
          "required": [
            "email",
            "password",
            "userType"
          ]
        },
        "LoginViaWalletDTO": {
          "type": "object",
          "properties": {
            "wallet": {
              "type": "string",
              "example": "261d24664f7d8b33193ab0a63ddb9a384b2ff0ef12b5ddb3a04b4fc72dd35747"
            },
            "publicKey": {
              "type": "string",
              "example": "017498b89ad40ab04a7b7af156e23a1a8abc05e0f49fb39c8c6b416ed2209004df"
            },
            "signature": {
              "type": "string",
              "example": "017498b89ad40ab04a7b7af156e23a1a8abc05e0f49fb39c8c6b416ed2209004df"
            },
            "type": {
              "type": "string",
              "enum": [
                "CASPER",
                "STACK",
                "ETH",
                "SKALE",
                "UNSTOPPABLEDOMAIN",
                "POLYGON",
                "HEDERA",
                "BINANCE",
                "REDBELLY",
                "BITLAYER",
                "LINEA",
                "BASE",
                "XRPLSIDECHAIN",
                "NEAR",
                "XUMM",
                "XVERSE",
                "UNISAT",
                "BITCOIN",
                "SOLANA"
              ],
              "example": "POLYGON"
            },
            "nonce": {
              "type": "string"
            },
            "customerShop": {
              "type": "string"
            },
            "signedDate": {
              "type": "string",
              "example": "10/29/2024, 10:19:41 AM"
            }
          },
          "required": [
            "wallet",
            "publicKey",
            "signature",
            "type",
            "customerShop",
            "signedDate"
          ]
        },
        "M2MService": {
          "type": "object",
          "properties": {}
        },
        "Option": {
          "type": "object",
          "properties": {
            "variantName": {
              "type": "string",
              "description": "The name of the variant",
              "example": "Size"
            },
            "value": {
              "type": "string",
              "description": "The value of the option",
              "example": "2XL"
            },
            "caption": {
              "type": "string",
              "description": "Caption for the option",
              "example": "2XL"
            }
          },
          "required": [
            "variantName",
            "value",
            "caption"
          ]
        },
        "Dimension": {
          "type": "object",
          "properties": {
            "length": {
              "type": "number",
              "description": "Length of the dimension",
              "example": 10
            },
            "width": {
              "type": "number",
              "description": "Width of the dimension",
              "example": 5
            },
            "height": {
              "type": "number",
              "description": "Height of the dimension",
              "example": 15
            }
          }
        },
        "CreateSkuDTO": {
          "type": "object",
          "properties": {
            "price": {
              "type": "number",
              "example": 24.5,
              "description": "Price of the SKU"
            },
            "rawPrice": {
              "type": "number",
              "example": 10,
              "description": "Raw price of the SKU"
            },
            "quantity": {
              "type": "number",
              "example": 5,
              "description": "Quantity of the SKU; -1 means unlimited supply"
            },
            "weight": {
              "type": "number",
              "example": 4,
              "description": "Weight of the SKU"
            },
            "externalID": {
              "type": "string",
              "description": "External ID of the SKU",
              "example": "externalID123"
            },
            "image": {
              "type": "string",
              "description": "Image URL of the SKU",
              "example": "http://example.com/image.jpg"
            },
            "options": {
              "description": "Options for the SKU",
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/Option"
              }
            },
            "dimensions": {
              "description": "Dimensions of the SKU",
              "allOf": [
                {
                  "$ref": "#/components/schemas/Dimension"
                }
              ]
            }
          },
          "required": [
            "price",
            "rawPrice",
            "quantity",
            "weight"
          ]
        },
        "createProductDTO": {
          "type": "object",
          "properties": {
            "title": {
              "type": "string",
              "example": "T-Shirt"
            },
            "description": {
              "type": "string",
              "example": "description"
            },
            "productCollectionID": {
              "type": "string",
              "example": "642ecc12db889ecd88d81dda"
            },
            "shippingType": {
              "type": "string",
              "example": "EASY_POST",
              "description": "Shipping type for the product"
            },
            "media": {
              "description": "List of media for the product",
              "example": [
                {
                  "url": "https://www.google.com/my-picture",
                  "isMain": false,
                  "thumbnail": "https://www.example.com/thumb.jpg"
                }
              ],
              "items": {
                "type": "array"
              },
              "type": "array"
            },
            "sku": {
              "description": "add sku",
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/CreateSkuDTO"
              }
            },
            "product_type": {
              "type": "string",
              "description": "Product type",
              "enum": [
                "NORMAL",
                "PRINT_ON_DEMAND",
                "DIGITAL",
                "EVENT"
              ]
            },
            "m2m_positions_options": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "m2m_positions": {
              "description": "POD Product m2m positions",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "m2m_services": {
              "description": "id of chosen mint file upload",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "pod_blank_product_id": {
              "type": "string",
              "description": "POD Product id"
            },
            "publish_product": {
              "type": "boolean",
              "description": "Publish product ."
            },
            "digitalDetail": {
              "type": "object",
              "example": {
                "file_url": "127.0.0.1/images/picture.jpg",
                "message": "Some Text Place Holder",
                "chain": "POLYGON"
              }
            },
            "positions": {
              "type": "object"
            },
            "printful_template_id": {
              "type": "string"
            },
            "tags": {
              "example": [
                "Women Hat"
              ],
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "isAddToCartDisabled": {
              "type": "boolean",
              "description": "Indicates if adding the product to the cart is disabled",
              "example": false
            },
            "printful_option_data": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "launchDate": {
              "format": "date-time",
              "type": "string",
              "example": "2024-07-01T13:13:54.936Z",
              "description": "New expiration date"
            },
            "canBeAffiliated": {
              "type": "boolean",
              "example": false
            },
            "commission": {
              "type": "number",
              "example": 20
            }
          },
          "required": [
            "title",
            "description",
            "productCollectionID",
            "shippingType",
            "media",
            "sku",
            "product_type",
            "m2m_positions_options",
            "m2m_positions",
            "m2m_services",
            "pod_blank_product_id",
            "publish_product",
            "digitalDetail",
            "positions",
            "printful_template_id",
            "tags",
            "printful_option_data",
            "canBeAffiliated",
            "commission"
          ]
        },
        "ObjectId": {
          "type": "object",
          "properties": {}
        },
        "RuleSetV2": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "example": "DISCOUNT",
              "description": "Type of the RuleSet",
              "enum": [
                "GATING",
                "DISCOUNT"
              ]
            },
            "discountPercentage": {
              "type": "number",
              "example": 20,
              "description": "Discount percentage (required for DISCOUNT type)",
              "minimum": 0,
              "maximum": 100
            },
            "nftPurchaseLink": {
              "type": "string",
              "example": "https://example.com",
              "description": "NFT purchase link"
            },
            "network": {
              "type": "string",
              "example": "ETH",
              "description": "Blockchain network",
              "enum": [
                "CASPER",
                "ETH",
                "STACKS",
                "POLYGON",
                "BINANCE",
                "REDBELLY",
                "BITLAYER",
                "SKALE",
                "HEDERA",
                "NEAR",
                "XRPLSIDECHAIN",
                "RIPPLE",
                "UNISAT",
                "UNSTOPPABLEDOMAIN",
                "BASE",
                "LINEA",
                "BITCOIN",
                "ORDINALS",
                "SOLANA",
                "ONCHAIN",
                "ONCHAINPREFIX"
              ]
            },
            "blockchainType": {
              "type": "string",
              "example": "NFT",
              "description": "Blockchain type",
              "enum": [
                "ORDINAL",
                "NFT"
              ]
            },
            "nftContractAddresses": {
              "example": [
                "0x123...",
                "0x456..."
              ],
              "description": "NFT contract addresses",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "minimumNftRequired": {
              "type": "number",
              "example": 1,
              "description": "Minimum number of NFTs required",
              "minimum": 1
            },
            "description": {
              "type": "string",
              "example": "This is a RuleSet description",
              "description": "Description of the RuleSet"
            },
            "ownerID": {
              "example": "6332a65d26038728b5aa9e43",
              "description": "User's owner ID",
              "allOf": [
                {
                  "$ref": "#/components/schemas/ObjectId"
                }
              ]
            },
            "shopId": {
              "example": "6332a65d26038728b5aa9e43",
              "description": "Shop's ID",
              "allOf": [
                {
                  "$ref": "#/components/schemas/ObjectId"
                }
              ]
            },
            "collectionID": {
              "example": "6332a65d26038728b5aa9e43",
              "description": "Collection's ID",
              "allOf": [
                {
                  "$ref": "#/components/schemas/ObjectId"
                }
              ]
            },
            "passedNftDetails": {
              "description": "List of arrays containing passed NFT details",
              "example": [],
              "type": "array",
              "items": {
                "type": "array"
              }
            },
            "_id": {
              "example": "6332a65d26038728b5aa9e43",
              "description": "Unique identifier for the RuleSet",
              "allOf": [
                {
                  "$ref": "#/components/schemas/ObjectId"
                }
              ]
            }
          },
          "required": [
            "type",
            "network",
            "blockchainType",
            "nftContractAddresses",
            "minimumNftRequired",
            "ownerID",
            "shopId",
            "collectionID",
            "passedNftDetails",
            "_id"
          ]
        },
        "Collection": {
          "type": "object",
          "properties": {
            "title": {
              "type": "string",
              "example": "Book",
              "description": "title of collection"
            },
            "ownerID": {
              "example": "6332a65d26038728b5aa9e43",
              "description": "owner id",
              "allOf": [
                {
                  "$ref": "#/components/schemas/User"
                }
              ]
            },
            "shopId": {
              "type": "object",
              "description": "Store ID",
              "example": "605c72ef3e6318003418321d"
            },
            "nftImages": {
              "example": [
                "nft image url 1",
                "nft image url 2"
              ],
              "description": "nft images",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "type": {
              "type": "string",
              "example": [
                "DEFAULT_PUBLIC",
                "PUBLIC",
                "HOLDER"
              ],
              "description": "type of collection",
              "enum": [
                "DEFAULT_PUBLIC",
                "PUBLIC",
                "HOLDER"
              ]
            },
            "image": {
              "type": "string",
              "example": "collection image url",
              "description": "collection image"
            },
            "description": {
              "type": "string",
              "example": "collection description",
              "description": "collection description"
            },
            "published": {
              "type": "boolean",
              "example": true,
              "description": "published status"
            },
            "ruleSetID": {
              "example": "6332a65d26038728b5aa9e43",
              "description": "collection ruleset",
              "allOf": [
                {
                  "$ref": "#/components/schemas/RuleSetV2"
                }
              ]
            },
            "order": {
              "type": "number"
            }
          },
          "required": [
            "title",
            "ownerID",
            "shopId",
            "nftImages",
            "type",
            "image",
            "description",
            "published",
            "ruleSetID",
            "order"
          ]
        },
        "EventProduct": {
          "type": "object",
          "properties": {}
        },
        "NftData": {
          "type": "object",
          "properties": {
            "deployHash": {
              "type": "string",
              "description": "Hash of the deployment transaction on the network",
              "example": "0xabc123..."
            },
            "transactionUrl": {
              "type": "string",
              "description": "URL of the transaction on the blockchain network",
              "example": "https://etherscan.io/tx/0xabc123..."
            },
            "networkName": {
              "type": "string",
              "description": "Name of the blockchain network where the NFT was minted",
              "example": "Ethereum"
            }
          },
          "required": [
            "deployHash",
            "transactionUrl",
            "networkName"
          ]
        },
        "Product": {
          "type": "object",
          "properties": {
            "ownerID": {
              "example": "id of the product owner",
              "allOf": [
                {
                  "$ref": "#/components/schemas/User"
                }
              ]
            },
            "shopIds": {
              "description": "Store ID",
              "example": "605c72ef3e6318003418321d",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "title": {
              "type": "string",
              "example": "Book",
              "description": "it is a title of product"
            },
            "description": {
              "type": "string",
              "example": "This is book",
              "description": "it is a description of product"
            },
            "type": {
              "type": "string",
              "example": "Droplink"
            },
            "product_type": {
              "type": "string",
              "enum": [
                "NORMAL",
                "PRINT_ON_DEMAND",
                "DIGITAL",
                "EVENT"
              ],
              "default": "NORMAL"
            },
            "artwork": {
              "type": "string"
            },
            "artwork2": {
              "type": "string"
            },
            "artwork_position": {
              "type": "string"
            },
            "artwork2_position": {
              "type": "string"
            },
            "m2m_positions_options": {
              "description": "print position data used for mint to merch functionality",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "printful_option_data": {
              "description": "option data from printful api",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "m2m_positions": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "m2m_services": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "pod_blank_product_id": {
              "type": "string"
            },
            "publish_status": {
              "type": "string"
            },
            "productCollectionID": {
              "example": "product collection id",
              "allOf": [
                {
                  "$ref": "#/components/schemas/Collection"
                }
              ]
            },
            "skuIDs": {
              "example": "sku id",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "media": {
              "example": "media",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "priceUnit": {
              "type": "string",
              "example": "USD",
              "description": "it is a currency"
            },
            "shippingType": {
              "type": "string",
              "example": "CUSTOM",
              "description": "it is shipping type"
            },
            "shippingPrice": {
              "type": "number",
              "example": "1000",
              "description": "it is shipping price"
            },
            "thumb": {
              "type": "string"
            },
            "purchaseAvailable": {
              "type": "boolean"
            },
            "pre_purchase_data_fetch": {
              "type": "object"
            },
            "order": {
              "type": "number"
            },
            "eventProduct": {
              "example": "event product detail",
              "allOf": [
                {
                  "$ref": "#/components/schemas/EventProduct"
                }
              ]
            },
            "canBeAffiliated": {
              "type": "boolean",
              "description": "specifies if product can be affiliated to other shops"
            },
            "commission": {
              "type": "number",
              "description": "affilaite commission"
            },
            "lowestPrice": {
              "type": "number",
              "description": "lowest sku price"
            },
            "highestPrice": {
              "type": "number",
              "description": "highest sku price"
            },
            "publicLink": {
              "type": "string",
              "description": "public api link"
            },
            "nftData": {
              "description": "Optional NFT data associated with the product",
              "allOf": [
                {
                  "$ref": "#/components/schemas/NftData"
                }
              ]
            }
          },
          "required": [
            "ownerID",
            "shopIds",
            "title",
            "description",
            "type",
            "product_type",
            "artwork",
            "artwork2",
            "artwork_position",
            "artwork2_position",
            "m2m_positions_options",
            "printful_option_data",
            "m2m_positions",
            "m2m_services",
            "pod_blank_product_id",
            "publish_status",
            "productCollectionID",
            "skuIDs",
            "media",
            "priceUnit",
            "shippingType",
            "shippingPrice",
            "thumb",
            "purchaseAvailable",
            "pre_purchase_data_fetch",
            "order",
            "eventProduct",
            "canBeAffiliated",
            "commission",
            "lowestPrice",
            "highestPrice",
            "publicLink"
          ]
        },
        "updateProductDTO": {
          "type": "object",
          "properties": {}
        },
        "importProductDTO": {
          "type": "object",
          "properties": {
            "shop_domain": {
              "type": "string",
              "example": "shop domain"
            }
          },
          "required": [
            "shop_domain"
          ]
        },
        "importPublicProductDTO": {
          "type": "object",
          "properties": {
            "shop_domain": {
              "type": "string",
              "example": "shop domain"
            },
            "ownerID": {
              "type": "string",
              "description": "it is owner id"
            }
          },
          "required": [
            "shop_domain",
            "ownerID"
          ]
        },
        "QuickCreatePodDTO": {
          "type": "object",
          "properties": {
            "title": {
              "type": "string"
            },
            "description": {
              "type": "string"
            },
            "images": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "price": {
              "type": "number"
            },
            "artwork": {
              "type": "string"
            },
            "templateId": {
              "type": "string"
            }
          },
          "required": [
            "title",
            "description",
            "images",
            "price",
            "artwork",
            "templateId"
          ]
        },
        "createProductTileDTO": {
          "type": "object",
          "properties": {
            "skuIDs": {
              "description": "sku ids",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "style": {
              "type": "object",
              "description": "sku ids"
            }
          },
          "required": [
            "skuIDs",
            "style"
          ]
        },
        "ProductTile": {
          "type": "object",
          "properties": {
            "skuIDs": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "embedded_tag": {
              "type": "string"
            },
            "style": {
              "type": "object"
            }
          },
          "required": [
            "skuIDs",
            "embedded_tag",
            "style"
          ]
        },
        "CreateDuplicateProduct": {
          "type": "object",
          "properties": {
            "productId": {
              "type": "string",
              "example": "6523f50e66476a236f8d7fce"
            }
          },
          "required": [
            "productId"
          ]
        },
        "ProductTileFile": {
          "type": "object",
          "properties": {
            "css": {
              "type": "string"
            },
            "js": {
              "type": "string"
            }
          },
          "required": [
            "css",
            "js"
          ]
        },
        "AvailableShippingRequestDto": {
          "type": "object",
          "properties": {
            "product_id": {
              "type": "string",
              "example": "12345",
              "description": "Product ID for the Printful product"
            }
          },
          "required": [
            "product_id"
          ]
        },
        "VectorUpdateResponseDto": {
          "type": "object",
          "properties": {
            "totalDocuments": {
              "type": "number",
              "description": "Total number of documents processed",
              "example": 1000
            },
            "updatedDocuments": {
              "type": "number",
              "description": "Number of documents successfully updated with vectors",
              "example": 950
            },
            "failedDocuments": {
              "type": "number",
              "description": "Number of documents that failed to update",
              "example": 50
            },
            "finalVectorCount": {
              "type": "number",
              "description": "Final count of documents with vectors",
              "example": 950
            }
          },
          "required": [
            "totalDocuments",
            "updatedDocuments",
            "failedDocuments",
            "finalVectorCount"
          ]
        },
        "SearchProductResponseDto": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string"
            },
            "title": {
              "type": "string"
            },
            "description": {
              "type": "string"
            },
            "price": {
              "type": "number"
            },
            "skuIDs": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "product_type": {
              "type": "string"
            },
            "shopName": {
              "type": "string"
            },
            "media": {
              "type": "string"
            },
            "score": {
              "type": "number",
              "description": "Vector similarity score",
              "example": 0.89
            }
          },
          "required": [
            "_id",
            "title",
            "description",
            "price",
            "skuIDs",
            "product_type",
            "shopName",
            "media",
            "score"
          ]
        },
        "ProcessTemplateDto": {
          "type": "object",
          "properties": {}
        },
        "Rule": {
          "type": "object",
          "properties": {
            "addresses": {
              "example": [
                "SPQZF23W7SEYBFG5JQ496NMY0G7379SRYEDREMSV.Candy::candy"
              ],
              "description": "NFT identifiers to be checked",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "type": {
              "type": "string",
              "example": "NFT",
              "description": "type of rule"
            },
            "discountPercentage": {
              "type": "number",
              "example": 100,
              "description": "discount percentage for this rule"
            },
            "nftsCount": {
              "type": "number",
              "example": 1,
              "description": "number of NFTs user should have to pass this rule"
            },
            "description": {
              "type": "string",
              "example": "example of rule description",
              "description": "description of rule"
            }
          },
          "required": [
            "addresses",
            "type",
            "discountPercentage",
            "nftsCount",
            "description"
          ]
        },
        "ruleSet": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "example": "RulesetName",
              "description": "name of ruleset"
            },
            "type": {
              "type": "string",
              "example": "CASPER",
              "description": "wallet type",
              "enum": [
                "CASPER",
                "STACK",
                "ETH"
              ]
            },
            "ruleType": {
              "type": "string",
              "example": "NFT",
              "description": "ruleset type",
              "enum": [
                "NFT",
                "ORDINALS",
                "ERC20"
              ]
            },
            "rules": {
              "description": "rules of ruleset",
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/Rule"
              }
            },
            "ownerID": {
              "example": "6332a65d26038728b5aa9e43",
              "description": "owner id",
              "allOf": [
                {
                  "$ref": "#/components/schemas/User"
                }
              ]
            },
            "shopId": {
              "type": "object",
              "example": "6332a65d26038728b5aa9e43",
              "description": "shop id"
            },
            "collectionID": {
              "example": "6332a65d26038728b5aa9e43",
              "description": "collection id",
              "allOf": [
                {
                  "$ref": "#/components/schemas/Collection"
                }
              ]
            },
            "redeemedNFTs": {
              "example": [
                "u1712"
              ],
              "description": "ids of reedemed NFTs",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "gated": {
              "type": "boolean",
              "example": true,
              "description": "ruleset is gated or not"
            },
            "webUrl": {
              "type": "string",
              "example": "weburl",
              "description": "weburl"
            }
          },
          "required": [
            "name",
            "type",
            "ruleType",
            "rules",
            "ownerID",
            "shopId",
            "collectionID",
            "redeemedNFTs",
            "gated",
            "webUrl"
          ]
        },
        "CreateCollectionDTO": {
          "type": "object",
          "properties": {
            "title": {
              "type": "string",
              "example": "CollectionTitle",
              "description": "title of collection"
            },
            "image": {
              "type": "string",
              "example": "collection image",
              "description": "image cdn link"
            },
            "description": {
              "type": "string",
              "example": "collection description",
              "description": "collection description"
            },
            "ruleSetID": {
              "example": "\"6332a65d26038728b5aa9e43\"",
              "description": "RulesetId",
              "allOf": [
                {
                  "$ref": "#/components/schemas/ruleSet"
                }
              ]
            },
            "published": {
              "type": "boolean",
              "example": false,
              "description": "is collection published or not"
            }
          },
          "required": [
            "title",
            "image",
            "description",
            "ruleSetID",
            "published"
          ]
        },
        "updateCollectionDTO": {
          "type": "object",
          "properties": {}
        },
        "addProductToCollection": {
          "type": "object",
          "properties": {
            "productID": {
              "type": "string",
              "example": "62eb953200605aa990597544",
              "description": "product id"
            }
          },
          "required": [
            "productID"
          ]
        },
        "RecordSKUDTO": {
          "type": "object",
          "properties": {
            "deploy_hash": {
              "type": "string",
              "example": "a0b2e3e6158a0e1fe875e4e55739f361d2c267d4cf03c47fd8f25d5943f64b01",
              "description": "It is a deploy hash like example, you should take it after call mint function"
            },
            "deploy_hash_link": {
              "type": "string",
              "description": "It is deploy hash url for the specified chain"
            },
            "royalty": {
              "type": "number",
              "example": 10
            },
            "canBeAffiliated": {
              "type": "boolean",
              "example": true,
              "description": "specifies if a sku can affiliated to another shop"
            },
            "skuID": {
              "type": "string",
              "example": "a0b2e3e6158a0e1fe8",
              "description": "It is a sku id that is going to record in the blockchain"
            },
            "commision": {
              "type": "number",
              "example": 10,
              "description": "Commision percentage that producer wants ."
            },
            "recorded_quantity": {
              "type": "number",
              "example": 10,
              "description": "Commision percentage that producer wants ."
            }
          },
          "required": [
            "deploy_hash",
            "deploy_hash_link",
            "royalty",
            "canBeAffiliated",
            "skuID",
            "commision",
            "recorded_quantity"
          ]
        },
        "RecordAllSKUDTO": {
          "type": "object",
          "properties": {
            "deploy_hash": {
              "type": "string",
              "example": "a0b2e3e6158a0e1fe875e4e55739f361d2c267d4cf03c47fd8f25d5943f64b01",
              "description": "It is a deploy hash like example, you should take it after call mint function"
            },
            "deploy_hash_link": {
              "type": "string",
              "description": "It is deploy hash url for the specified chain"
            },
            "royalty": {
              "type": "number",
              "example": 10
            },
            "canBeAffiliated": {
              "type": "boolean",
              "example": true,
              "description": "specifies if a sku can affiliated to another shop"
            },
            "productId": {
              "type": "string",
              "example": "a0b2e3e6158a0e1fe8",
              "description": "It is a product id that is going to record in the blockchain"
            },
            "commision": {
              "type": "number",
              "example": 10,
              "description": "Commision percentage that producer wants ."
            },
            "recorded_quantity": {
              "type": "number",
              "example": 10,
              "description": "Commision percentage that producer wants ."
            }
          },
          "required": [
            "deploy_hash",
            "deploy_hash_link",
            "royalty",
            "canBeAffiliated",
            "productId",
            "commision",
            "recorded_quantity"
          ]
        },
        "updateSkuDTO": {
          "type": "object",
          "properties": {
            "quantity": {
              "type": "number",
              "description": "It is a quantity of product 100"
            },
            "price": {
              "type": "number",
              "description": "It is price for sku"
            },
            "externalID": {
              "type": "string",
              "description": "It is an externalID that can be anything"
            },
            "dimensions": {
              "description": "It is dimension",
              "allOf": [
                {
                  "$ref": "#/components/schemas/Dimension"
                }
              ]
            },
            "deploy_hash": {
              "type": "string",
              "description": "it is deploy hash",
              "example": "a0b2e3e6158a0e1fe875e4e55739f361d2c267d4cf03c47fd8f25d5943f64b01"
            }
          },
          "required": [
            "quantity",
            "price",
            "externalID",
            "dimensions",
            "deploy_hash"
          ]
        },
        "updateOptionsOfSkusDTO": {
          "type": "object",
          "properties": {}
        },
        "Sku": {
          "type": "object",
          "properties": {
            "shopIds": {
              "description": "Store ID",
              "example": "605c72ef3e6318003418321d",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "price": {
              "type": "number",
              "example": "24.5",
              "description": "it is a price"
            },
            "rawPrice": {
              "type": "number",
              "example": 10,
              "description": "Raw price of printful"
            },
            "quantity": {
              "type": "number",
              "example": "5",
              "description": "it is a quantity | -1 means unlimited supply"
            },
            "recorded_quantity": {
              "type": "number",
              "example": "5",
              "description": "number of recorded qunatities"
            },
            "canBeAffiliated": {
              "type": "boolean",
              "description": "specifies if sku can be affiliated to other shops"
            },
            "weight": {
              "type": "number",
              "example": "4",
              "description": "it is a weight"
            },
            "sold_units": {
              "type": "number",
              "example": "2",
              "description": "its the number of sold units"
            },
            "deploy_hash": {
              "type": "string",
              "example": "a0b2e3e6158a0e1fe875e4e55739f361d2c267d4cf03c47fd8f25d5943f64b01",
              "description": "it is a sku deploy hash"
            },
            "deploy_hash_link": {
              "type": "string",
              "description": "it is a sku deploy hash url"
            }
          },
          "required": [
            "shopIds",
            "price",
            "quantity",
            "recorded_quantity",
            "canBeAffiliated",
            "weight",
            "sold_units",
            "deploy_hash",
            "deploy_hash_link"
          ]
        },
        "SkuMetadataDto": {
          "type": "object",
          "properties": {
            "metadata": {
              "type": "string",
              "example": "{\"name\":\"Mafia Hoodie\",\"description\":\"<p>Mafia Hoodie</p>\",\"image\":\"https://upload-file-flatlay.s3.us-west-2.amazonaws.com/8f9147e1edece19ae5e4dc8e7e3aa14dccc5a734a4950bc4d3a6c5560c754da6.jpg_or.jpg\",\"properties\":{\"externalID\":\"1\",\"price\":60,\"dimensions\":{\"height\":0,\"length\":0,\"width\":0},\"quantity\":1000000,\"recorded_quantity\":1000000,\"recordData\":{\"status\":\"NOT_RECORDED\",\"commision\":10},\"deploy_hash\":\"\",\"_id\":\"660a1284e985c24baccb5535\"}}",
              "description": "Stringified Sku Metadata Object"
            }
          },
          "required": [
            "metadata"
          ]
        },
        "RecordCircleSkuDto": {
          "type": "object",
          "properties": {
            "deploy_hash": {
              "type": "string",
              "example": "a0b2e3e6158a0e1fe875e4e55739f361d2c267d4cf03c47fd8f25d5943f64b01",
              "description": "It is a deploy hash like example, you should take it after call mint function"
            },
            "deploy_hash_link": {
              "type": "string",
              "description": "It is deploy hash url for the specified chain"
            },
            "royalty": {
              "type": "number",
              "example": 10
            },
            "canBeAffiliated": {
              "type": "boolean",
              "example": true,
              "description": "specifies if a sku can affiliated to another shop"
            },
            "skuID": {
              "type": "string",
              "example": "a0b2e3e6158a0e1fe8",
              "description": "It is a sku id that is going to record in the blockchain"
            },
            "commision": {
              "type": "number",
              "example": 10,
              "description": "Commision percentage that producer wants ."
            },
            "recorded_quantity": {
              "type": "number",
              "example": 10,
              "description": "Commision percentage that producer wants ."
            },
            "price": {
              "type": "number",
              "example": 10,
              "description": "Product Price on digital."
            },
            "beneficiaries": {
              "example": [],
              "description": "Beneficiaries",
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          "required": [
            "deploy_hash",
            "deploy_hash_link",
            "royalty",
            "canBeAffiliated",
            "skuID",
            "commision",
            "recorded_quantity",
            "price",
            "beneficiaries"
          ]
        },
        "RecordCircleAllSkuDto": {
          "type": "object",
          "properties": {
            "deploy_hash": {
              "type": "string",
              "example": "a0b2e3e6158a0e1fe875e4e55739f361d2c267d4cf03c47fd8f25d5943f64b01",
              "description": "It is a deploy hash like example, you should take it after call mint function"
            },
            "deploy_hash_link": {
              "type": "string",
              "description": "It is deploy hash url for the specified chain"
            },
            "royalty": {
              "type": "number",
              "example": 10
            },
            "canBeAffiliated": {
              "type": "boolean",
              "example": true,
              "description": "specifies if a sku can affiliated to another shop"
            },
            "productId": {
              "type": "string",
              "example": "a0b2e3e6158a0e1fe8",
              "description": "It is a product id that is going to record in the blockchain"
            },
            "commision": {
              "type": "number",
              "example": 10,
              "description": "Commision percentage that producer wants ."
            },
            "recorded_quantity": {
              "type": "number",
              "example": 10,
              "description": "Commision percentage that producer wants ."
            }
          },
          "required": [
            "deploy_hash",
            "deploy_hash_link",
            "royalty",
            "canBeAffiliated",
            "productId",
            "commision",
            "recorded_quantity"
          ]
        },
        "M2MData": {
          "type": "object",
          "properties": {
            "m2m_position": {
              "type": "string",
              "description": "M2M print position .",
              "enum": [
                "back",
                "front",
                "BACK_CENTER",
                "FRONT_CENTER",
                "FRONT_LEFT_CHEST",
                "FRONT_RIGHT_CHEST",
                "LEFT_LEG_FRONT",
                "RIGHT_LEG_FRONT",
                "BACK_NECK"
              ]
            },
            "print_url": {
              "type": "string",
              "description": "M2M print url ."
            },
            "preview": {
              "type": "string",
              "description": "Mockup image ."
            }
          },
          "required": [
            "m2m_position",
            "print_url",
            "preview"
          ]
        },
        "createCartDTO": {
          "type": "object",
          "properties": {
            "shopID": {
              "type": "string",
              "example": "6332a65d26038728b5aa9e43",
              "description": "shop id ."
            },
            "skuID": {
              "type": "string",
              "example": "6332a65d26038728b5aa9e43",
              "description": "sku id"
            },
            "quantity": {
              "type": "number",
              "example": 12,
              "description": "quantity"
            },
            "m2m_data": {
              "description": "M2M Data",
              "allOf": [
                {
                  "$ref": "#/components/schemas/M2MData"
                }
              ]
            },
            "wallet": {
              "type": "string",
              "example": "SPAZRQ6AYS584PE7EZP61YSE66H7T567C57E532K",
              "description": "wallet"
            }
          },
          "required": [
            "shopID",
            "skuID",
            "quantity",
            "m2m_data"
          ]
        },
        "AddressBooks": {
          "type": "object",
          "properties": {
            "firstName": {
              "type": "string",
              "example": "Bob",
              "description": "first name"
            },
            "lastName": {
              "type": "string",
              "example": "Bell",
              "description": "last name"
            },
            "addressLine1": {
              "type": "string",
              "example": "Stadio Carlos Tartiere",
              "description": "first address line"
            },
            "addressLine2": {
              "type": "string",
              "example": "1450 Washington St",
              "description": "second address line"
            },
            "country": {
              "type": "string",
              "example": "Germany",
              "description": "country"
            },
            "city": {
              "type": "string",
              "example": "Homburg",
              "description": "city"
            },
            "state": {
              "type": "string",
              "example": "Freistaaten",
              "description": "state"
            },
            "zip": {
              "type": "string",
              "example": "33005",
              "description": "zip code"
            },
            "addressType": {
              "type": "string",
              "example": "SHOP",
              "description": "address type",
              "enum": [
                "CUSTOMER",
                "SHOP",
                "SHIPPING_CUSTOMER"
              ]
            },
            "easyPostAddressID": {
              "type": "string",
              "example": "adr_d66438d148cc11ed9076ac1f6bj12125",
              "description": "EasyPost address id"
            },
            "ownerID": {
              "example": "62acaca3cf66d8c0b581b69d",
              "description": "owner id",
              "allOf": [
                {
                  "$ref": "#/components/schemas/User"
                }
              ]
            },
            "shopId": {
              "type": "object",
              "example": "62acaca3cf66d8c0b581b69d",
              "description": "shop id"
            },
            "phoneNumber": {
              "type": "string",
              "example": "+1",
              "description": "Phone Number"
            }
          },
          "required": [
            "firstName",
            "lastName",
            "addressLine1",
            "addressLine2",
            "country",
            "city",
            "state",
            "zip",
            "addressType",
            "easyPostAddressID",
            "ownerID",
            "shopId",
            "phoneNumber"
          ]
        },
        "Template": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "example": "montserrat_light",
              "description": "name of template"
            },
            "background": {
              "type": "string"
            },
            "foreground": {
              "type": "string"
            },
            "textColor": {
              "type": "string"
            },
            "fontFamily": {
              "type": "string"
            },
            "borderColor": {
              "type": "string"
            }
          },
          "required": [
            "name",
            "background",
            "foreground",
            "textColor",
            "fontFamily",
            "borderColor"
          ]
        },
        "DNSData": {
          "type": "object",
          "properties": {
            "domain_name": {
              "type": "string"
            },
            "NS_records": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "existed_before": {
              "type": "boolean"
            }
          },
          "required": [
            "domain_name",
            "NS_records",
            "existed_before"
          ]
        },
        "Shops": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "example": "nike",
              "description": "name of shop"
            },
            "ownerID": {
              "example": "636fd84d0a7a1ec1a6d66e33",
              "description": "owner id",
              "allOf": [
                {
                  "$ref": "#/components/schemas/User"
                }
              ]
            },
            "addressBookID": {
              "example": "636fd84d0a7a1ec1a6d66e33",
              "description": "address book id",
              "allOf": [
                {
                  "$ref": "#/components/schemas/AddressBooks"
                }
              ]
            },
            "templateID": {
              "example": "636fd84d0a7a1ec1a6d66e33",
              "description": "template id",
              "allOf": [
                {
                  "$ref": "#/components/schemas/Template"
                }
              ]
            },
            "template_options": {
              "type": "object"
            },
            "description": {
              "type": "string",
              "example": "nike shop - germany",
              "description": "shop description"
            },
            "shopDomain": {
              "description": "domain of shop",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "dnsData": {
              "description": "DNS data",
              "allOf": [
                {
                  "$ref": "#/components/schemas/DNSData"
                }
              ]
            },
            "headerIcon": {
              "type": "string",
              "description": "It is a header icon"
            },
            "textColor": {
              "type": "string",
              "description": "It is a text color"
            },
            "backgroundColor": {
              "type": "string",
              "description": "It is a background color"
            },
            "backgroundText": {
              "type": "string",
              "description": "It is a background text"
            },
            "theme": {
              "type": "string",
              "description": "It is a theme"
            },
            "backgroundImage": {
              "type": "string",
              "description": "It is an image address"
            },
            "backgroundImageSecondary": {
              "type": "string",
              "description": "It is an background image secondary address"
            },
            "infoEmail": {
              "type": "string",
              "description": "It is just an info email address that it will show on profile shop as contact"
            },
            "instagramURL": {
              "type": "string",
              "example": "https://www.instagram.com/nike",
              "description": "instagram url"
            },
            "discordURL": {
              "type": "string",
              "example": "https://discord.gg/NPGprF27",
              "description": "discord url"
            },
            "twitterURL": {
              "type": "string",
              "example": "https://twitter.com/nike",
              "description": "twitter url"
            },
            "telegramURL": {
              "type": "string",
              "example": "https://telegram.or/nike",
              "description": "tele url"
            },
            "messengerURL": {
              "type": "string",
              "example": "https://messenger.com/nike",
              "description": "messenger url"
            },
            "youtubeURL": {
              "type": "string",
              "example": "https://youtube.com/nike",
              "description": "YT url"
            },
            "facebookURL": {
              "type": "string",
              "description": "facebook url"
            },
            "linkedinURL": {
              "type": "string",
              "description": "linkedin url"
            },
            "tiktokURL": {
              "type": "string",
              "description": "tiktok url"
            },
            "logo": {
              "type": "string",
              "example": "logo url",
              "description": "shop logo"
            },
            "webURL": {
              "type": "string",
              "example": "weburl",
              "description": "web URL"
            },
            "productsTags": {
              "description": "Unique products tags",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "imsType": {
              "type": "string",
              "example": "DROPLINKED",
              "enum": [
                "DROPLINKED",
                "SHOPIFY"
              ]
            },
            "tags": {
              "description": "Shop Tags",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "loginMethods": {
              "description": "Chosen login methods",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "shopDesign": {
              "type": "object",
              "description": "Shop design options"
            },
            "credit": {
              "type": "number",
              "description": "Shop Credit"
            },
            "expressStripeAccountId": {
              "type": "string",
              "description": "express stripe account id"
            },
            "onboardedExpressStripeAccount": {
              "type": "boolean",
              "description": "express stripe account id"
            },
            "apiKey": {
              "type": "string",
              "description": "API KEY"
            },
            "privateKey": {
              "type": "string",
              "description": "Private key"
            },
            "hasCustomDomain": {
              "type": "boolean",
              "description": "custom domain status"
            },
            "oauth2Client": {
              "type": "object",
              "description": "Oauth2 Client Information"
            },
            "pre_purchase_data_fetch": {
              "type": "object"
            },
            "referralDetails": {
              "type": "object"
            },
            "referredCode": {
              "type": "string"
            },
            "admins": {
              "example": "636fd84d0a7a1ec1a6d66e33",
              "description": "admin ids",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "tokenBasedPricing": {
              "type": "object",
              "example": {
                "token": "MEW",
                "tokenSign": ""
              },
              "description": "calculate price product based on specific chain"
            },
            "productDisplayByCollection": {
              "type": "boolean",
              "example": false,
              "description": "product of shop displayed by collection"
            },
            "deployedContracts": {
              "description": "Shop's Deployed Contracts",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "automaticSubscriptionUpdate": {
              "type": "boolean",
              "description": "Shop automatic subscription update with credit"
            },
            "subscriptionUpdateStatus": {
              "type": "object",
              "description": "Shop subscription status"
            },
            "currency": {
              "type": "object",
              "description": "currency of the shop",
              "example": {
                "abbreviation": "USD",
                "symbol": "$",
                "conversionRateToUSD": 1
              }
            },
            "productTileStyle": {
              "type": "object",
              "description": "product tile design"
            },
            "isAgeRestricted": {
              "type": "boolean",
              "description": "Indicates if the shop has an age restriction of 18+"
            },
            "isCatalogMode": {
              "type": "boolean",
              "description": "Indicates if the shop is in catalog mode"
            },
            "hasCompletedQuests": {
              "type": "boolean",
              "description": "Indicates if the shop has completed quests"
            },
            "footerDescription": {
              "type": "string",
              "description": "footer description"
            }
          },
          "required": [
            "name",
            "ownerID",
            "addressBookID",
            "templateID",
            "template_options",
            "description",
            "shopDomain",
            "dnsData",
            "headerIcon",
            "textColor",
            "backgroundColor",
            "backgroundText",
            "theme",
            "backgroundImage",
            "backgroundImageSecondary",
            "infoEmail",
            "instagramURL",
            "discordURL",
            "twitterURL",
            "telegramURL",
            "messengerURL",
            "youtubeURL",
            "facebookURL",
            "linkedinURL",
            "tiktokURL",
            "logo",
            "webURL",
            "productsTags",
            "imsType",
            "tags",
            "loginMethods",
            "shopDesign",
            "credit",
            "expressStripeAccountId",
            "onboardedExpressStripeAccount",
            "apiKey",
            "privateKey",
            "hasCustomDomain",
            "oauth2Client",
            "pre_purchase_data_fetch",
            "referralDetails",
            "referredCode",
            "admins",
            "tokenBasedPricing",
            "productDisplayByCollection",
            "deployedContracts",
            "automaticSubscriptionUpdate",
            "subscriptionUpdateStatus",
            "currency",
            "productTileStyle"
          ]
        },
        "Item": {
          "type": "object",
          "properties": {
            "skuID": {
              "example": "6332a65d26038728b5aa9e43",
              "description": "sku id",
              "allOf": [
                {
                  "$ref": "#/components/schemas/Sku"
                }
              ]
            },
            "quantity": {
              "type": "number",
              "example": 1,
              "description": "quantity"
            }
          },
          "required": [
            "skuID",
            "quantity"
          ]
        },
        "Shipping": {
          "type": "object",
          "properties": {
            "weightUnit": {
              "type": "string",
              "example": "KG",
              "description": "Weight Unit",
              "enum": [
                "KG",
                "OZ"
              ]
            },
            "sizeUnit": {
              "type": "string",
              "example": "CM",
              "description": "Size Unit",
              "enum": [
                "CM",
                "INCH"
              ]
            },
            "calculateBasedOnUnit": {
              "type": "string",
              "example": "WEIGHT",
              "description": "It will determine which unit should be calculated with price unit",
              "enum": [
                "WEIGHT",
                "SIZE"
              ]
            },
            "rates": {
              "description": "List of Available Rates",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "isActive": {
              "type": "boolean",
              "example": true,
              "description": "Set the shipping Enable/Disable"
            }
          },
          "required": [
            "weightUnit",
            "sizeUnit",
            "calculateBasedOnUnit",
            "rates",
            "isActive"
          ]
        },
        "Taxes": {
          "type": "object",
          "properties": {
            "droplinked": {
              "type": "number",
              "example": 1.5,
              "description": "Droplinked taxes"
            },
            "producer": {
              "type": "number",
              "example": 0.75,
              "description": "Producer taxes"
            },
            "total": {
              "type": "number",
              "example": 2.25,
              "description": "Total taxes"
            }
          },
          "required": [
            "droplinked",
            "producer",
            "total"
          ]
        },
        "Costs": {
          "type": "object",
          "properties": {
            "subtotal": {
              "type": "number",
              "example": 100,
              "description": "Subtotal of the cart"
            },
            "totalWithoutDiscount": {
              "type": "number",
              "example": 120,
              "description": "Cart total without discounts applied"
            },
            "shipping": {
              "description": "Shipping costs breakdown",
              "allOf": [
                {
                  "$ref": "#/components/schemas/Shipping"
                }
              ]
            },
            "taxes": {
              "description": "Taxes breakdown",
              "allOf": [
                {
                  "$ref": "#/components/schemas/Taxes"
                }
              ]
            },
            "discountApplied": {
              "type": "number",
              "example": 10,
              "description": "Discount applied"
            },
            "totalCartAmount": {
              "type": "number",
              "example": 90,
              "description": "Total amount of the cart"
            },
            "droplinkedCommission": {
              "type": "number",
              "example": 2,
              "description": "Droplinked commission"
            },
            "stripeCommission": {
              "type": "number",
              "example": 3,
              "description": "Stripe commission"
            },
            "droplinkedTotalShare": {
              "type": "number",
              "example": 8,
              "description": "Total amount owed to Droplinked"
            },
            "producerNetProfit": {
              "type": "number",
              "example": 40,
              "description": "Net profit for the producer"
            }
          },
          "required": [
            "subtotal",
            "totalWithoutDiscount",
            "shipping",
            "taxes",
            "discountApplied",
            "totalCartAmount",
            "droplinkedCommission",
            "stripeCommission",
            "droplinkedTotalShare",
            "producerNetProfit"
          ]
        },
        "Cart": {
          "type": "object",
          "properties": {
            "status": {
              "type": "string",
              "examples": [
                "ACTIVE",
                "CHECKED_OUT"
              ],
              "description": "status of cart",
              "enum": [
                "ACTIVE",
                "CHECKED_OUT",
                "PENDING"
              ]
            },
            "shopID": {
              "example": "6332a65d26038728b5aa9e43",
              "description": "shop id",
              "allOf": [
                {
                  "$ref": "#/components/schemas/Shops"
                }
              ]
            },
            "ownerID": {
              "example": "6332a65d26038728b5aa9e43",
              "description": "owner id",
              "allOf": [
                {
                  "$ref": "#/components/schemas/User"
                }
              ]
            },
            "checkoutAddressID": {
              "example": "6332a65d26038728b5aa9e43",
              "description": "checkout address id ( address book id )",
              "allOf": [
                {
                  "$ref": "#/components/schemas/AddressBooks"
                }
              ]
            },
            "items": {
              "description": "cart items",
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/Item"
              }
            },
            "paymentIntent": {
              "type": "object",
              "description": "payment intent"
            },
            "shipmentRates": {
              "type": "object",
              "description": "available shipment rates"
            },
            "selectedShipmentRate": {
              "type": "number",
              "example": 2,
              "description": "Shipment rate ."
            },
            "selectedShipmentRateID": {
              "type": "string",
              "description": "Shipment rate id ."
            },
            "shipmentData": {
              "type": "object",
              "description": "Shipment data ."
            },
            "availableShipmentRates": {
              "description": "available shipment rates",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "selectedShipmentRates": {
              "example": 2,
              "description": "selected shipment rates",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "selectedShipmentRateIDs": {
              "description": "Shipment rate id .",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "shipmentInformation": {
              "description": "Shipment data .",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "costs": {
              "description": "Costs information",
              "allOf": [
                {
                  "$ref": "#/components/schemas/Costs"
                }
              ]
            }
          },
          "required": [
            "status",
            "shopID",
            "ownerID",
            "checkoutAddressID",
            "items",
            "paymentIntent",
            "shipmentRates",
            "selectedShipmentRate",
            "selectedShipmentRateID",
            "shipmentData",
            "availableShipmentRates",
            "selectedShipmentRates",
            "selectedShipmentRateIDs",
            "shipmentInformation",
            "costs"
          ]
        },
        "updateCartDTO": {
          "type": "object",
          "properties": {
            "quantity": {
              "type": "number",
              "example": 12,
              "description": "quantity number"
            },
            "shopID": {
              "type": "string",
              "example": "6332a65d26038728b5aa9e43",
              "description": "shop id ."
            },
            "itemId": {
              "type": "string",
              "example": "6332a65d26038728b5aa9e43",
              "description": "item id ."
            }
          },
          "required": [
            "quantity",
            "shopID",
            "itemId"
          ]
        },
        "UpdateProductQuantityDTO": {
          "type": "object",
          "properties": {
            "shopID": {
              "type": "string",
              "example": "6332a65d26038728b5aa9e43",
              "description": "shop id"
            },
            "skuID": {
              "type": "string",
              "example": "6332a65d26038728b5aa9e43",
              "description": "sku id"
            },
            "quantity": {
              "type": "number",
              "example": 1,
              "description": "quantity"
            },
            "itemId": {
              "type": "string",
              "example": "6332a65d26038728b5aa9e43",
              "description": "Item Id"
            }
          },
          "required": [
            "shopID",
            "skuID",
            "quantity",
            "itemId"
          ]
        },
        "DeleteProductDTO": {
          "type": "object",
          "properties": {
            "itemId": {
              "type": "string",
              "example": "6332a65d26038728b5aa9e43",
              "description": "item id"
            }
          },
          "required": [
            "itemId"
          ]
        },
        "UpdateCartM2MPreview": {
          "type": "object",
          "properties": {
            "preview": {
              "type": "string",
              "example": "https://printful-upload.s3-accelerate.amazonaws.com/tmp/a942c30a92ba90feed8466f641362ed6/unisex-heavy-blend-hoodie-black-front-65a51f91343dc.png",
              "description": "the link of generated mockup to be added to cart"
            }
          },
          "required": [
            "preview"
          ]
        },
        "AddEmailToUserCartDto": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string",
              "example": "example@droplinked.com",
              "description": "An valid email"
            }
          },
          "required": [
            "email"
          ]
        },
        "AddEmailToAnoymousCartDto": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string",
              "example": "example@droplinked.com",
              "description": "An valid email"
            },
            "note": {
              "type": "string",
              "description": "additional info"
            }
          },
          "required": [
            "email",
            "note"
          ]
        },
        "ProducInvoicetDto": {
          "type": "object",
          "properties": {
            "skuId": {
              "type": "string",
              "example": "6332a65d26038728b5aa9e43",
              "description": "Sku Id"
            },
            "quantity": {
              "type": "number",
              "example": 12,
              "description": "Quantity"
            }
          },
          "required": [
            "skuId",
            "quantity"
          ]
        },
        "AddProductsToInvoiceCartDto": {
          "type": "object",
          "properties": {
            "products": {
              "description": "Array of products to be added to the cart",
              "example": [
                {
                  "skuId": "6332a65d26038728b5aa9e43",
                  "quantity": 12
                },
                {
                  "skuId": "7332b65d36048729b6bb9f54",
                  "quantity": 5
                }
              ],
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/ProducInvoicetDto"
              }
            }
          },
          "required": [
            "products"
          ]
        },
        "CartPaymentMethod": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "description": "Type of payment method"
            },
            "token": {
              "type": "string",
              "description": "Token used for the payment method"
            },
            "isCustom": {
              "type": "boolean",
              "description": "Whether the payment method is custom"
            },
            "icon": {
              "type": "string",
              "description": "Icon for the payment method"
            },
            "isDirectPayment": {
              "type": "boolean",
              "description": "Whether the payment is direct payment"
            },
            "destinationAddress": {
              "type": "object",
              "description": "Destination address for the payment method"
            },
            "chainId": {
              "type": "string",
              "description": "Chain ID for the payment method"
            },
            "label": {
              "type": "string",
              "description": "Label for the payment method"
            },
            "stripeType": {
              "type": "string",
              "description": "Stripe payment type",
              "enum": [
                "SHOPCURRENCY",
                "LOCALCURRENCY"
              ]
            }
          },
          "required": [
            "type",
            "label"
          ]
        },
        "AttachAdditionalDetailsDto": {
          "type": "object",
          "properties": {
            "addressId": {
              "type": "string",
              "example": "628e6179e16d1959dc1a42c5"
            },
            "email": {
              "type": "string",
              "example": "drop@link.com"
            },
            "note": {
              "type": "string",
              "example": "Some additional note"
            }
          },
          "required": [
            "addressId",
            "email",
            "note"
          ]
        },
        "SelectShippingRateVas": {
          "type": "object",
          "properties": {
            "rates": {
              "example": [
                {
                  "groupId": "6332a65d26038728b5aa9e43",
                  "shipmentId": "STANDARD"
                }
              ],
              "description": "Array of shipment rates",
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          "required": [
            "rates"
          ]
        },
        "CreateRuleSetV2DTO": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "description": "Type of the RuleSet DISCOUNT or GATING ",
              "enum": [
                "GATING",
                "DISCOUNT"
              ],
              "example": [
                "DISCOUNT",
                "GATING"
              ]
            },
            "discountPercentage": {
              "type": "number",
              "description": "Discount percentage (required for DISCOUNT type)",
              "example": 20,
              "minimum": 0,
              "maximum": 100
            },
            "nftPurchaseLink": {
              "type": "string",
              "description": "NFT purchase link",
              "example": "https://example.com"
            },
            "network": {
              "type": "string",
              "description": "Blockchain network",
              "enum": [
                "CASPER",
                "ETH",
                "STACKS",
                "POLYGON",
                "BINANCE",
                "REDBELLY",
                "BITLAYER",
                "SKALE",
                "HEDERA",
                "NEAR",
                "XRPLSIDECHAIN",
                "RIPPLE",
                "UNISAT",
                "UNSTOPPABLEDOMAIN",
                "BASE",
                "LINEA",
                "BITCOIN",
                "ORDINALS",
                "SOLANA",
                "ONCHAIN",
                "ONCHAINPREFIX"
              ],
              "example": "ETH"
            },
            "blockchainType": {
              "type": "string",
              "description": "Blockchain type",
              "enum": [
                "ORDINAL",
                "NFT"
              ],
              "example": "NFT"
            },
            "nftContractAddresses": {
              "description": "NFT contract addresses",
              "example": [
                "0x123...",
                "0x456..."
              ],
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "minimumNftRequired": {
              "type": "number",
              "description": "Minimum number of NFTs required",
              "example": 1,
              "minimum": 1
            },
            "description": {
              "type": "string",
              "description": "Description of the RuleSet",
              "example": "This is a RuleSet description."
            },
            "collectionID": {
              "type": "string",
              "description": "Collection ID",
              "example": "6332a65d26038728b5aa9e43"
            }
          },
          "required": [
            "type",
            "network",
            "blockchainType",
            "nftContractAddresses",
            "minimumNftRequired",
            "collectionID"
          ]
        },
        "UpdateRuleSetV2DTO": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "description": "Type of the RuleSet",
              "enum": [
                "GATING",
                "DISCOUNT"
              ],
              "example": "DISCOUNT"
            },
            "discountPercentage": {
              "type": "number",
              "description": "Discount percentage (required for DISCOUNT type)",
              "example": 20,
              "minimum": 0,
              "maximum": 100
            },
            "nftPurchaseLink": {
              "type": "string",
              "description": "NFT purchase link",
              "example": "https://example.com"
            },
            "network": {
              "type": "string",
              "description": "Blockchain network",
              "enum": [
                "CASPER",
                "ETH",
                "STACKS",
                "POLYGON",
                "BINANCE",
                "REDBELLY",
                "BITLAYER",
                "SKALE",
                "HEDERA",
                "NEAR",
                "XRPLSIDECHAIN",
                "RIPPLE",
                "UNISAT",
                "UNSTOPPABLEDOMAIN",
                "BASE",
                "LINEA",
                "BITCOIN",
                "ORDINALS",
                "SOLANA",
                "ONCHAIN",
                "ONCHAINPREFIX"
              ],
              "example": "ETH"
            },
            "blockchainType": {
              "type": "string",
              "description": "Blockchain type",
              "enum": [
                "ORDINAL",
                "NFT"
              ],
              "example": "NFT"
            },
            "nftContractAddresses": {
              "description": "NFT contract addresses",
              "example": [
                "0x123...",
                "0x456..."
              ],
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "minimumNftRequired": {
              "type": "number",
              "description": "Minimum number of NFTs required",
              "example": 1,
              "minimum": 1
            },
            "description": {
              "type": "string",
              "description": "Description of the RuleSet",
              "example": "This is a RuleSet description."
            },
            "collectionID": {
              "type": "string",
              "description": "Collection ID",
              "example": "6332a65d26038728b5aa9e43"
            }
          }
        },
        "FetchNFTDTO": {
          "type": "object",
          "properties": {
            "address": {
              "type": "string",
              "description": "user's wallet address",
              "example": "54EJGiszCrQcNdpYyy9SJV35b6YcC4kJXQoJWeN7Neq5"
            },
            "chain": {
              "type": "string",
              "description": "wallet's chain",
              "example": "SOLANA"
            },
            "network": {
              "type": "string",
              "description": "chain's network",
              "example": "TESTNET || MAINNET"
            }
          },
          "required": [
            "address",
            "chain",
            "network"
          ]
        },
        "PreviewFileDTO": {
          "type": "object",
          "properties": {
            "placement": {
              "type": "string",
              "description": "Placement of the image (e.g., front, back)",
              "example": "front"
            },
            "image_url": {
              "type": "string",
              "description": "URL of the image to be placed",
              "example": "https://example.com/image.png"
            },
            "position": {
              "type": "object",
              "description": "Positioning details for the placement (JSON object)",
              "example": {
                "x": 0,
                "y": 0,
                "width": 100,
                "height": 100
              }
            }
          },
          "required": [
            "placement",
            "image_url",
            "position"
          ]
        },
        "PreviewRequestDTO": {
          "type": "object",
          "properties": {
            "blank_pod": {
              "type": "string",
              "description": "Blank pod name (required)",
              "example": "SampleBlankPod"
            },
            "variant_ids": {
              "type": "string",
              "description": "Comma-separated list of variant IDs (required)",
              "example": "variant1,variant2"
            },
            "files": {
              "description": "Details of the file to be previewed (required)",
              "allOf": [
                {
                  "$ref": "#/components/schemas/PreviewFileDTO"
                }
              ]
            }
          },
          "required": [
            "blank_pod",
            "variant_ids",
            "files"
          ]
        },
        "AddAddressDTO": {
          "type": "object",
          "properties": {
            "addressBookID": {
              "type": "string",
              "example": "628e6179e16d1959dc1a42c5",
              "description": "address book id"
            },
            "note": {
              "type": "string",
              "example": "example note"
            }
          },
          "required": [
            "addressBookID",
            "note"
          ]
        },
        "createCheckoutDTO": {
          "type": "object",
          "properties": {
            "orderID": {
              "type": "string",
              "description": "order id ."
            }
          },
          "required": [
            "orderID"
          ]
        },
        "AnonymousCartCheckoutDTO": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string",
              "example": "example@email.com",
              "description": "user email address ."
            },
            "orderID": {
              "type": "string",
              "description": "order id ."
            }
          },
          "required": [
            "email",
            "orderID"
          ]
        },
        "CartCryptoCheckoutDto": {
          "type": "object",
          "properties": {
            "walletAddress": {
              "type": "string",
              "example": "0x000",
              "description": "Wallet Address"
            }
          },
          "required": [
            "walletAddress"
          ]
        },
        "AnonymousCartCasperCheckoutDTO": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string",
              "example": "customer@example.com",
              "description": "user email address ."
            },
            "type": {
              "type": "string",
              "example": "stripe",
              "description": "payment type (stripe or paymob)",
              "enum": [
                "stripe",
                "paymob"
              ]
            }
          },
          "required": [
            "email",
            "type"
          ]
        },
        "AnonymousCartCryptoCheckoutDto": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string",
              "example": "example@email.com",
              "description": "user email address ."
            },
            "walletAddress": {
              "type": "string",
              "example": "0x000",
              "description": "Wallet Address"
            }
          },
          "required": [
            "email",
            "walletAddress"
          ]
        },
        "TestPayment": {
          "type": "object",
          "properties": {
            "orderId": {
              "type": "string"
            },
            "cartId": {
              "type": "string"
            }
          },
          "required": [
            "orderId",
            "cartId"
          ]
        },
        "TestSampleOrderPayment": {
          "type": "object",
          "properties": {
            "sampleOrderId": {
              "type": "string"
            }
          },
          "required": [
            "sampleOrderId"
          ]
        },
        "UpdateOrderDTO": {
          "type": "object",
          "properties": {
            "status": {
              "type": "string",
              "example": "WAITING_FOR_CONFIRMATION",
              "description": "order status",
              "enum": [
                "PAYMENT_CONFIRMED",
                "WAITING_FOR_PAYMENT",
                "WAITING_FOR_CONFIRMATION",
                "INITIALIZED_FOR_PAYMENT",
                "PROCESSING",
                "SENT",
                "CANCELED",
                "CANCELED_PAYMENT_TIMEOUT",
                "REFUNDED",
                "IN_CART",
                "VOIDED"
              ]
            }
          },
          "required": [
            "status"
          ]
        },
        "OrderPaymentBodyDto": {
          "type": "object",
          "properties": {
            "deploy_hash": {
              "type": "string",
              "example": "0x68213890d155f1ef9990e9d9fb8ed9f7cdb014c5c2f24a84b4807a0ac50aa040"
            },
            "cryptoAmount": {
              "type": "number",
              "example": 125.53424
            },
            "orderID": {
              "type": "string",
              "example": "6332a65d26038728b5aa9e43"
            },
            "walletAddress": {
              "type": "string",
              "example": "0x0"
            }
          },
          "required": [
            "deploy_hash",
            "cryptoAmount",
            "orderID",
            "walletAddress"
          ]
        },
        "SkuDto": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string",
              "description": "Sku Id"
            },
            "quantity": {
              "type": "number",
              "description": "Quantity"
            }
          },
          "required": [
            "_id",
            "quantity"
          ]
        },
        "createAddressBooksDTO": {
          "type": "object",
          "properties": {
            "firstName": {
              "type": "string",
              "example": "Bob",
              "description": "first name"
            },
            "lastName": {
              "type": "string",
              "example": "Tommy",
              "description": "last name"
            },
            "addressLine1": {
              "type": "string",
              "example": "Estadio Carlos Tartiere",
              "description": "first address line"
            },
            "addressLine2": {
              "type": "string",
              "example": "1450 Washington St",
              "description": "second address line"
            },
            "country": {
              "type": "string",
              "example": "Germany",
              "description": "country"
            },
            "city": {
              "type": "string",
              "example": "Homburg",
              "description": "city"
            },
            "state": {
              "type": "string",
              "example": "Freistaaten",
              "description": "state"
            },
            "zip": {
              "type": "string",
              "example": "33005",
              "description": "zip code"
            },
            "addressType": {
              "type": "string",
              "example": "SHOP",
              "description": "address type",
              "enum": [
                "CUSTOMER",
                "SHOP",
                "SHIPPING_CUSTOMER"
              ]
            },
            "phoneNumber": {
              "type": "string",
              "example": "+1-222-1234",
              "description": "Phone Number"
            },
            "forceVerify": {
              "type": "boolean",
              "description": "Force to verify address"
            }
          },
          "required": [
            "firstName",
            "lastName",
            "addressLine1",
            "addressLine2",
            "country",
            "city",
            "state",
            "zip",
            "addressType"
          ]
        },
        "SampleOrderDto": {
          "type": "object",
          "properties": {
            "addressId": {
              "type": "string",
              "description": "Address Id"
            },
            "skus": {
              "description": "Skus",
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/SkuDto"
              }
            },
            "address": {
              "description": "Address",
              "allOf": [
                {
                  "$ref": "#/components/schemas/createAddressBooksDTO"
                }
              ]
            },
            "orderId": {
              "type": "string",
              "description": "Order Id"
            }
          },
          "required": [
            "addressId",
            "skus",
            "address",
            "orderId"
          ]
        },
        "SampleOrderItem": {
          "type": "object",
          "properties": {
            "product": {
              "type": "object",
              "example": "product_id",
              "description": "Product Id"
            },
            "sku": {
              "type": "object",
              "example": "sku_id",
              "description": "Sku Id"
            },
            "quantity": {
              "type": "number",
              "example": 2,
              "description": "Quantity"
            },
            "price": {
              "type": "number",
              "example": 25.99,
              "description": "Price"
            },
            "color": {
              "type": "string",
              "example": "Blue",
              "description": "Color"
            },
            "size": {
              "type": "string",
              "example": "Large",
              "description": "Size"
            }
          },
          "required": [
            "product",
            "sku",
            "quantity",
            "price",
            "color",
            "size"
          ]
        },
        "SampleOrder": {
          "type": "object",
          "properties": {
            "userId": {
              "type": "object",
              "example": "6332a65d26038728b5aa9e43",
              "description": "User Id"
            },
            "shopId": {
              "type": "object",
              "example": "6332a65d26038728b5aa9e43",
              "description": "Shop Id"
            },
            "items": {
              "description": "Items in order",
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/SampleOrderItem"
              }
            },
            "status": {
              "type": "string",
              "example": "WAITING_FOR_PAYMENT",
              "description": "status of cart",
              "enum": [
                "INITIALIZING_INFORMATION",
                "WAITING_FOR_PAYMENT",
                "PAYMENT_CONFIRMED",
                "CANCELED",
                "TIMED_OUT"
              ]
            },
            "paymentIntent": {
              "type": "object",
              "example": {
                "id": "e1",
                "secret": "f1"
              },
              "description": "Stripe payment intent id"
            },
            "address": {
              "description": "User Address",
              "allOf": [
                {
                  "$ref": "#/components/schemas/AddressBooks"
                }
              ]
            },
            "shippingPrice": {
              "type": "number",
              "example": "7.47",
              "description": "Shipping Price"
            }
          },
          "required": [
            "userId",
            "shopId",
            "items",
            "status",
            "paymentIntent",
            "address",
            "shippingPrice"
          ]
        },
        "SubmitSampleOrderDto": {
          "type": "object",
          "properties": {
            "rateId": {
              "type": "string",
              "description": "Rate Id"
            }
          },
          "required": [
            "rateId"
          ]
        },
        "AttachTrackingUrlDto": {
          "type": "object",
          "properties": {
            "url": {
              "type": "string",
              "example": "https://veiis-tracker.com/track/12345",
              "description": "Tracking Url"
            }
          },
          "required": [
            "url"
          ]
        },
        "Notification": {
          "type": "object",
          "properties": {
            "text": {
              "type": "string",
              "example": "You have just received a new order",
              "description": "notification description"
            },
            "data": {
              "type": "object",
              "example": "636fd84d0a7a1ec1a6d66e33",
              "description": "order id"
            },
            "type": {
              "type": "string",
              "example": "PRODUCER_ORDER_NEW",
              "description": "type of notification",
              "enum": [
                "PRODUCER_ORDER_NEW",
                "PRODUCER_SKU_QUANTITY",
                "TEST",
                "CUSTOMER_ORDER_STATUS",
                "DIGITAL_PRODUCT",
                "PAYMENT_FAILED"
              ]
            },
            "template": {
              "type": "string",
              "description": "template ID"
            },
            "ownerID": {
              "example": "636fd84d0a7a1ec1a6d66e33",
              "description": "ownerID",
              "allOf": [
                {
                  "$ref": "#/components/schemas/User"
                }
              ]
            },
            "seen": {
              "type": "boolean",
              "example": false,
              "description": "user saw notification or not"
            }
          },
          "required": [
            "text",
            "data",
            "type",
            "template",
            "ownerID",
            "seen"
          ]
        },
        "CreateMessageDto": {
          "type": "object",
          "properties": {
            "firstName": {
              "type": "string",
              "example": "alex"
            },
            "lastName": {
              "type": "string",
              "example": "boden"
            },
            "email": {
              "type": "string",
              "example": "example@gmail.com"
            },
            "message": {
              "type": "string",
              "example": "message"
            }
          },
          "required": [
            "firstName",
            "lastName",
            "email",
            "message"
          ]
        },
        "createCheckoutShopifyDTO": {
          "type": "object",
          "properties": {
            "shopDomain": {
              "type": "string",
              "example": "flatlayfrontstore.myshopify.com",
              "description": "It is a shop domain from your shopify domain"
            },
            "checkoutItem": {
              "type": "object",
              "description": "It is an object for checkout"
            }
          },
          "required": [
            "shopDomain",
            "checkoutItem"
          ]
        },
        "createPaymentShopifyDTO": {
          "type": "object",
          "properties": {
            "shopDomain": {
              "type": "string",
              "example": "flatlayfrontstore.myshopify.com",
              "description": "It is a shop domain from your shopify domain"
            },
            "checkoutID": {
              "type": "string",
              "example": "d15884bcba1763aabbb083c5f355b256",
              "description": "It is a checkout id"
            },
            "session_id": {
              "type": "string",
              "example": "east-6fc2c0dde9643400a80008b00cda4b1e",
              "description": "It is a session id"
            }
          },
          "required": [
            "shopDomain",
            "checkoutID",
            "session_id"
          ]
        },
        "getShippingRateDTO": {
          "type": "object",
          "properties": {
            "shopDomain": {
              "type": "string",
              "example": "flatlayfrontstore.myshopify.com",
              "description": "It is a shop domain from your shopify domain"
            },
            "checkoutID": {
              "type": "string",
              "example": "d15884bcba1763aabbb083c5f355b256",
              "description": "It is a checkout id"
            }
          },
          "required": [
            "shopDomain",
            "checkoutID"
          ]
        },
        "updateShopifyCheckoutDTO": {
          "type": "object",
          "properties": {
            "shopDomain": {
              "type": "string",
              "example": "flatlayfrontstore.myshopify.com",
              "description": "It is a shop domain from your shopify domain"
            },
            "checkoutItem": {
              "type": "object",
              "description": "It is an object for checkout"
            },
            "checkoutID": {
              "type": "string",
              "example": "d15884bcba1763aabbb083c5f355b256",
              "description": "It is a checkout id"
            }
          },
          "required": [
            "shopDomain",
            "checkoutItem",
            "checkoutID"
          ]
        },
        "AffiliateCallbackDto": {
          "type": "object",
          "properties": {}
        },
        "AffiliateRequestDTO": {
          "type": "object",
          "properties": {
            "shopID": {
              "type": "string",
              "description": "Shop id ."
            },
            "productID": {
              "type": "string",
              "description": "It is product id to request for affiliate"
            },
            "deploy_hash": {
              "type": "string",
              "description": "Deploy hash of affiliate request ."
            },
            "skuID": {
              "type": "string",
              "description": "It is sku id to request for affiliate"
            },
            "quantity": {
              "type": "number",
              "description": "It is quantity to request for affiliate"
            },
            "affiliateData": {
              "description": "َAffiliate Data based on Solana",
              "allOf": [
                {
                  "$ref": "#/components/schemas/AffiliateCallbackDto"
                }
              ]
            }
          },
          "required": [
            "shopID",
            "productID",
            "deploy_hash",
            "skuID",
            "quantity",
            "affiliateData"
          ]
        },
        "AcceptRejectRequestDTO": {
          "type": "object",
          "properties": {
            "deploy_hash": {
              "type": "string",
              "description": "Deploy Hash ."
            },
            "requestID": {
              "type": "string",
              "description": "Request ID ."
            },
            "status": {
              "type": "string",
              "description": "Request statue .",
              "example": "ACCEPTED || REJECTED"
            }
          },
          "required": [
            "deploy_hash",
            "requestID",
            "status"
          ]
        },
        "CasperCancelRequestDTO": {
          "type": "object",
          "properties": {
            "deploy_hash": {
              "type": "string",
              "description": "Deploy Hash ."
            },
            "requestID": {
              "type": "string",
              "description": "Request ID ."
            }
          },
          "required": [
            "deploy_hash",
            "requestID"
          ]
        },
        "AddPairDTO": {
          "type": "object",
          "properties": {
            "key": {
              "type": "string",
              "description": "Key",
              "example": "key1"
            },
            "value": {
              "type": "string",
              "description": "Value",
              "example": "value1"
            }
          },
          "required": [
            "key",
            "value"
          ]
        },
        "GenerateMockupBody": {
          "type": "object",
          "properties": {
            "variant_ids": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "format": {
              "type": "string"
            },
            "template id": {
              "type": "number"
            },
            "files array": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "technique": {
              "type": "string"
            }
          },
          "required": [
            "variant_ids",
            "format",
            "template id",
            "files array",
            "technique"
          ]
        },
        "GetPrintfulNonceDTO": {
          "type": "object",
          "properties": {
            "external_product_id": {
              "type": "string"
            },
            "external_customer_id": {
              "type": "string"
            }
          },
          "required": [
            "external_product_id",
            "external_customer_id"
          ]
        },
        "GenerateOverlayDTO": {
          "type": "object",
          "properties": {
            "baseImageLink": {
              "type": "string",
              "description": "link of the base image of the product, from the chosen m2m_position_option url"
            },
            "overlayImageLink": {
              "type": "string",
              "description": "link of the uploaded nft or image from the user (in png format or others)"
            }
          },
          "required": [
            "baseImageLink",
            "overlayImageLink"
          ]
        },
        "VariantOption": {
          "type": "object",
          "properties": {}
        },
        "CreateGiftCardDTO": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "example": "summer discount",
              "description": "name of gift card"
            },
            "type": {
              "type": "string",
              "example": "DISCOUNT",
              "description": "type of giftCard",
              "enum": [
                "CREDIT",
                "DISCOUNT"
              ]
            },
            "balance": {
              "type": "number",
              "example": 5,
              "description": "discount"
            },
            "expiryDate": {
              "format": "date-time",
              "type": "string",
              "example": "2023-08-20",
              "description": "date of expiration"
            },
            "quantity": {
              "type": "number",
              "example": 10,
              "description": "number of codes"
            }
          },
          "required": [
            "name",
            "type",
            "balance",
            "expiryDate",
            "quantity"
          ]
        },
        "UpdateExpireDate": {
          "type": "object",
          "properties": {
            "expiryDate": {
              "format": "date-time",
              "type": "string",
              "example": "2023-08-20",
              "description": "New expiration date"
            }
          },
          "required": [
            "expiryDate"
          ]
        },
        "addToAnonCartDTO": {
          "type": "object",
          "properties": {
            "m2m_data": {
              "description": "its an optional property that should be used when adding a mint to merch product to the cart",
              "allOf": [
                {
                  "$ref": "#/components/schemas/M2MData"
                }
              ]
            },
            "shopID": {
              "type": "string",
              "example": "6332a65d26038728b5aa9e43",
              "description": "shop id ."
            },
            "skuID": {
              "type": "string",
              "example": "6332a65d26038728b5aa9e43",
              "description": "sku id"
            },
            "quantity": {
              "type": "number",
              "example": 12,
              "description": "quantity"
            }
          },
          "required": [
            "m2m_data",
            "shopID",
            "skuID",
            "quantity"
          ]
        },
        "GeneratePublicMockupBody": {
          "type": "object",
          "properties": {
            "variant_ids": {
              "description": "an array that contains the externalID of a chosen product SKU",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "files": {
              "description": "an array that contains a object with the uploaded nft image url and the chosen placement",
              "example": {
                "image_url": "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/6df37a0aad14c0acb41ae1ffbfa35b48934f61ccc559d4cfb68d1a52c9fcf4e5_or",
                "placement": "front",
                "position": {}
              },
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "pod_blank_product_id": {
              "type": "string",
              "description": "the pod_blank_product_id that you get from the product data"
            },
            "technique": {
              "type": "string",
              "description": "optional property if the product has a specific technique in the retrieved data"
            }
          },
          "required": [
            "variant_ids",
            "files",
            "pod_blank_product_id",
            "technique"
          ]
        },
        "StripeCheckoutDto": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string",
              "description": "Customer email address",
              "example": "customer@example.com"
            }
          },
          "required": [
            "email"
          ]
        },
        "Order": {
          "type": "object",
          "properties": {
            "status": {
              "type": "string",
              "example": "WAITING_FOR_PAYMENT",
              "description": "status of cart",
              "enum": [
                "PAYMENT_CONFIRMED",
                "WAITING_FOR_PAYMENT",
                "WAITING_FOR_CONFIRMATION",
                "INITIALIZED_FOR_PAYMENT",
                "PROCESSING",
                "SENT",
                "CANCELED",
                "CANCELED_PAYMENT_TIMEOUT",
                "REFUNDED",
                "IN_CART",
                "VOIDED"
              ]
            },
            "ownerID": {
              "example": "6332a65d26038728b5aa9e43",
              "description": "owner id",
              "allOf": [
                {
                  "$ref": "#/components/schemas/User"
                }
              ]
            },
            "customerID": {
              "example": "6332a65d26038728b5aa9e43",
              "description": "customer id",
              "allOf": [
                {
                  "$ref": "#/components/schemas/User"
                }
              ]
            },
            "shopID": {
              "type": "object",
              "example": "6332a65d26038728b5aa9e43",
              "description": "shop id"
            },
            "cartID": {
              "example": "6332a65d26038728b5aa9e43",
              "description": "cart id",
              "allOf": [
                {
                  "$ref": "#/components/schemas/Cart"
                }
              ]
            },
            "items": {
              "description": "items in the order",
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/Item"
              }
            },
            "paymentIntentID": {
              "type": "string",
              "example": "pi_4KXvOUDHP9PnFF5D1MChaPrM",
              "description": "payment id"
            },
            "selectedShipmentRates": {
              "example": 7,
              "description": "EasyPost shipment rate",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "purchaseID": {
              "type": "string",
              "example": "3cyix2",
              "description": "purchase id"
            },
            "seenByProducer": {
              "type": "boolean",
              "example": false,
              "description": "producer saw this order or not"
            },
            "customerAddressBook": {
              "description": "customer address book",
              "allOf": [
                {
                  "$ref": "#/components/schemas/AddressBooks"
                }
              ]
            },
            "shippingPrice": {
              "type": "number",
              "example": "7,47",
              "description": "shipping price"
            },
            "shipmentPostageLabelURL": {
              "type": "string",
              "example": "shipment postage label url",
              "description": "shipment postage label url"
            },
            "shipmentTrackingCode": {
              "type": "string",
              "example": "",
              "description": "shipment tracking code"
            }
          },
          "required": [
            "status",
            "ownerID",
            "customerID",
            "shopID",
            "cartID",
            "items",
            "paymentIntentID",
            "selectedShipmentRates",
            "purchaseID",
            "seenByProducer",
            "customerAddressBook",
            "shippingPrice",
            "shipmentPostageLabelURL",
            "shipmentTrackingCode"
          ]
        },
        "PublicApplyGiftCardDto": {
          "type": "object",
          "properties": {
            "code": {
              "type": "string",
              "example": "dfr54tgy6u",
              "description": "Gift Card code"
            },
            "cartId": {
              "type": "string",
              "example": "64cf871007f3ef6c1c01b931",
              "description": "Cart Id"
            }
          },
          "required": [
            "code",
            "cartId"
          ]
        },
        "Currency": {
          "type": "object",
          "properties": {
            "abbreviation": {
              "type": "string",
              "example": "USD"
            },
            "symbol": {
              "type": "string",
              "example": "$"
            },
            "conversionRateToUSD": {
              "type": "number",
              "example": 1
            },
            "decimalPlaces": {
              "type": "number",
              "example": 2,
              "description": "Number of decimal places to display"
            },
            "thousandsSeparator": {
              "type": "string",
              "example": ",",
              "description": "Character used to separate thousands"
            },
            "decimalSeparator": {
              "type": "string",
              "example": ".",
              "description": "Character used as decimal separator"
            },
            "symbolPosition": {
              "type": "string",
              "example": "before",
              "description": "Position of the currency symbol relative to the amount",
              "enum": [
                "before",
                "after"
              ]
            },
            "spaceBetweenAmountAndSymbol": {
              "type": "boolean",
              "example": false,
              "description": "Whether to add a space between the amount and symbol"
            },
            "locale": {
              "type": "string",
              "example": "en-US",
              "description": "Locale for number formatting"
            }
          },
          "required": [
            "abbreviation",
            "symbol",
            "conversionRateToUSD",
            "decimalPlaces",
            "thousandsSeparator",
            "decimalSeparator",
            "symbolPosition",
            "spaceBetweenAmountAndSymbol",
            "locale"
          ]
        },
        "SocialMedia": {
          "type": "object",
          "properties": {
            "instagramURL": {
              "type": "string",
              "example": "https://instagram.com/example"
            },
            "discordURL": {
              "type": "string",
              "example": "https://discord.com/example"
            },
            "twitterURL": {
              "type": "string",
              "example": "https://twitter.com/example"
            },
            "telegramURL": {
              "type": "string",
              "example": "https://t.me/example"
            },
            "messengerURL": {
              "type": "string",
              "example": "https://m.me/example"
            },
            "youtubeURL": {
              "type": "string",
              "example": "https://youtube.com/example"
            },
            "facebookURL": {
              "type": "string",
              "example": "https://facebook.com/example"
            },
            "linkedinURL": {
              "type": "string",
              "example": "https://linkedin.com/example"
            },
            "tiktokURL": {
              "type": "string",
              "example": "https://tiktok.com/example"
            },
            "webURL": {
              "type": "string",
              "example": "https://example-shop.com"
            }
          },
          "required": [
            "instagramURL",
            "discordURL",
            "twitterURL",
            "telegramURL",
            "messengerURL",
            "youtubeURL",
            "facebookURL",
            "linkedinURL",
            "tiktokURL",
            "webURL"
          ]
        },
        "Style": {
          "type": "object",
          "properties": {
            "logo": {
              "type": "string",
              "example": "https://example.com/logo.png"
            },
            "navbarIcon": {
              "type": "string",
              "example": "https://example.com/navbar-icon.png"
            },
            "heroSectionImage": {
              "type": "string",
              "example": "https://example.com/hero-image.png"
            }
          },
          "required": [
            "logo",
            "navbarIcon",
            "heroSectionImage"
          ]
        },
        "ShopData": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "example": "Example Shop"
            },
            "shopDomain": {
              "type": "string",
              "example": "example-shop.com"
            },
            "credit": {
              "type": "number",
              "example": 0.1
            },
            "referredCode": {
              "type": "string",
              "example": "ABCD1234"
            },
            "deployedContracts": {
              "example": [
                "contract1",
                "contract2"
              ],
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "currency": {
              "$ref": "#/components/schemas/Currency"
            },
            "launchDate": {
              "type": "string",
              "example": "2019-08-24"
            },
            "isAgeRestricted": {
              "type": "boolean",
              "example": true
            },
            "socialMedia": {
              "$ref": "#/components/schemas/SocialMedia"
            },
            "style": {
              "$ref": "#/components/schemas/Style"
            }
          },
          "required": [
            "name",
            "shopDomain",
            "credit",
            "referredCode",
            "deployedContracts",
            "currency",
            "launchDate",
            "isAgeRestricted",
            "socialMedia",
            "style"
          ]
        },
        "DestinationAddress": {
          "type": "object",
          "properties": {
            "destinationAddress": {
              "type": "string",
              "description": "The destination address for the payment.",
              "example": "0x6ef804B370C9913f1F0118d65C6207CA792A69e3"
            },
            "percent": {
              "type": "number",
              "description": "The percentage of the payment that goes to this address.",
              "example": 80
            }
          },
          "required": [
            "destinationAddress",
            "percent"
          ]
        },
        "PaymentMethod": {
          "type": "object",
          "properties": {}
        },
        "ChartDetails": {
          "type": "object",
          "properties": {
            "order": {
              "type": "number"
            },
            "revenue": {
              "type": "number"
            },
            "profit": {
              "type": "number"
            },
            "direct": {
              "type": "number"
            },
            "affiliate": {
              "type": "number"
            }
          },
          "required": [
            "order",
            "revenue",
            "profit",
            "direct",
            "affiliate"
          ]
        },
        "RevenueChart": {
          "type": "object",
          "properties": {
            "title": {
              "type": "object"
            },
            "value": {
              "type": "number"
            },
            "details": {
              "$ref": "#/components/schemas/ChartDetails"
            }
          },
          "required": [
            "title",
            "value",
            "details"
          ]
        },
        "RevenueReportDetail": {
          "type": "object",
          "properties": {
            "affiliate": {
              "type": "number"
            },
            "direct": {
              "type": "number"
            },
            "value": {
              "type": "number"
            }
          },
          "required": [
            "affiliate",
            "direct",
            "value"
          ]
        },
        "RevenueReport": {
          "type": "object",
          "properties": {
            "profit": {
              "$ref": "#/components/schemas/RevenueReportDetail"
            },
            "orders": {
              "$ref": "#/components/schemas/RevenueReportDetail"
            },
            "customerChart": {
              "$ref": "#/components/schemas/RevenueReportDetail"
            }
          },
          "required": [
            "profit",
            "orders",
            "customerChart"
          ]
        },
        "RevenueChartResponseDto": {
          "type": "object",
          "properties": {
            "total": {
              "type": "number"
            },
            "chart": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/RevenueChart"
              }
            },
            "report": {
              "$ref": "#/components/schemas/RevenueReport"
            }
          },
          "required": [
            "total",
            "chart",
            "report"
          ]
        },
        "CreateBlogDto": {
          "type": "object",
          "properties": {
            "title": {
              "type": "string",
              "description": "Title of the post",
              "example": "How to Create a Blog"
            },
            "content": {
              "type": "string",
              "description": "Content of the post",
              "example": "This is a detailed guide on creating a blog..."
            },
            "image": {
              "type": "string",
              "description": "Image link in CDN",
              "example": "https://cdn.example.com/image.jpg"
            },
            "tags": {
              "description": "List of tags associated with the post",
              "example": [
                "tech",
                "new release",
                "gadgets"
              ],
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "searchEngineSummary": {
              "type": "string",
              "description": "Search engine summary of the post",
              "example": "A brief summary for search engines"
            },
            "category": {
              "type": "string",
              "description": "Category of the post",
              "example": "Technology"
            },
            "isFeatured": {
              "type": "boolean",
              "description": "Whether the post is featured",
              "example": true
            },
            "isVisible": {
              "type": "boolean",
              "description": "Whether the post is visible to readers",
              "example": true
            }
          },
          "required": [
            "title",
            "content",
            "image",
            "tags",
            "searchEngineSummary",
            "category",
            "isFeatured",
            "isVisible"
          ]
        },
        "Invitation": {
          "type": "object",
          "properties": {
            "senderId": {
              "description": "ID of the user who sends the invitation",
              "example": "605c72ef2d6318003418321c",
              "allOf": [
                {
                  "$ref": "#/components/schemas/ObjectId"
                }
              ]
            },
            "recipientEmail": {
              "type": "string",
              "description": "Email address of the invitation recipient",
              "example": "example@domain.com"
            },
            "storeId": {
              "description": "Store ID associated with the invitation",
              "example": "605c72ef3e6318003418321d",
              "allOf": [
                {
                  "$ref": "#/components/schemas/ObjectId"
                }
              ]
            },
            "token": {
              "type": "string",
              "description": "Unique token for the invitation",
              "example": "xyz12345"
            },
            "status": {
              "type": "string",
              "description": "Current status of the invitation",
              "example": "PENDING",
              "enum": [
                "PENDING",
                "ACCEPTED",
                "REJECTED",
                "EXPIRED"
              ]
            },
            "role": {
              "type": "string",
              "description": "Current role of the invitation",
              "example": "ADMIN",
              "enum": [
                "ADMIN"
              ]
            },
            "expiresAt": {
              "format": "date-time",
              "type": "string",
              "description": "Expiration date and time of the invitation",
              "example": "2021-04-05T14:48:00.000Z"
            }
          },
          "required": [
            "senderId",
            "recipientEmail",
            "storeId",
            "token",
            "status",
            "role",
            "expiresAt"
          ]
        },
        "inviteUserDto": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string"
            }
          },
          "required": [
            "email"
          ]
        },
        "Clarity": {
          "type": "object",
          "properties": {
            "shopName": {
              "type": "string",
              "example": "unstoppabledomains",
              "description": "shop name"
            },
            "totalSessionCount": {
              "type": "number",
              "example": 22,
              "description": "total sessions count for every shop"
            },
            "pagesPerSession": {
              "type": "number",
              "example": 3.4,
              "description": "total view / total sessions"
            },
            "activeTimeSpent": {
              "type": "number",
              "example": 254,
              "description": "total activate time / total Session Count"
            },
            "topCountries": {
              "type": "object",
              "example": "{united states : 43}",
              "description": "top user countries that visit shop"
            }
          },
          "required": [
            "shopName",
            "totalSessionCount",
            "pagesPerSession",
            "activeTimeSpent",
            "topCountries"
          ]
        },
        "RateDto": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "example": "Chronopost International Express",
              "description": "Title of delivery service"
            },
            "pricePerUnit": {
              "type": "number",
              "example": 10,
              "description": "Price Per Unit"
            },
            "estimatedDeliveryDate": {
              "type": "string",
              "example": "2 - 4 Days",
              "description": "Estimated Delivary Date"
            },
            "countries": {
              "example": [
                "DE",
                "UK",
                "DK",
                "FR",
                "CH",
                "IT",
                "PT",
                "ES"
              ],
              "description": "ISO-2 Country Names as Array",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "groupName": {
              "type": "string",
              "description": "Title of group of countries as Europe or MENA",
              "example": "Europe"
            }
          },
          "required": [
            "name",
            "pricePerUnit",
            "estimatedDeliveryDate",
            "countries",
            "groupName"
          ]
        },
        "CreateShippingDto": {
          "type": "object",
          "properties": {
            "title": {
              "type": "string",
              "description": "A Custom Title Entered By User"
            },
            "weightUnit": {
              "type": "string",
              "example": "KG"
            },
            "sizeUnit": {
              "type": "string",
              "example": "CM"
            },
            "calculateBasedOnUnit": {
              "type": "string",
              "example": "WEIGHT",
              "description": "It will determine which unit should be calculated with price unit"
            },
            "rates": {
              "description": "List of Rates",
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/RateDto"
              }
            },
            "isActive": {
              "type": "boolean",
              "description": "Rate Active Status"
            }
          },
          "required": [
            "title",
            "weightUnit",
            "sizeUnit",
            "calculateBasedOnUnit",
            "rates",
            "isActive"
          ]
        },
        "UpdateShippingDto": {
          "type": "object",
          "properties": {
            "title": {
              "type": "string",
              "description": "A Custom Title Entered By User"
            },
            "weightUnit": {
              "type": "string",
              "example": "KG"
            },
            "sizeUnit": {
              "type": "string",
              "example": "CM"
            },
            "calculateBasedOnUnit": {
              "type": "string",
              "example": "WEIGHT",
              "description": "It will determine which unit should be calculated with price unit"
            },
            "rates": {
              "description": "List of Rates",
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/RateDto"
              }
            },
            "isActive": {
              "type": "boolean",
              "description": "Rate Active Status"
            }
          },
          "required": [
            "weightUnit",
            "sizeUnit",
            "calculateBasedOnUnit",
            "rates",
            "isActive"
          ]
        },
        "ChangeShippingStatusDto": {
          "type": "object",
          "properties": {
            "status": {
              "type": "boolean",
              "description": "Shipping Active Status"
            }
          },
          "required": [
            "status"
          ]
        },
        "CreateChainDto": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "description": "The network of the chain",
              "enum": [
                "CASPER",
                "POLYGON",
                "BINANCE",
                "REDBELLY",
                "BITLAYER",
                "ETH",
                "STACKS",
                "XRPLSIDECHAIN",
                "NEAR",
                "SKALE",
                "BASE",
                "LINEA",
                "SOLANA"
              ]
            },
            "description": {
              "type": "string",
              "description": "The description of the chain"
            },
            "icon": {
              "type": "string",
              "description": "The URL to the chain's icon"
            }
          },
          "required": [
            "type",
            "description",
            "icon"
          ]
        },
        "ChainDto": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string"
            },
            "description": {
              "type": "string"
            },
            "type": {
              "type": "string"
            },
            "icon": {
              "type": "string"
            },
            "createdAt": {
              "format": "date-time",
              "type": "string"
            },
            "updatedAt": {
              "format": "date-time",
              "type": "string"
            }
          },
          "required": [
            "_id",
            "description",
            "type",
            "icon",
            "createdAt",
            "updatedAt"
          ]
        },
        "UpdateChainDto": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "description": "The network of the chain",
              "enum": [
                "CASPER",
                "POLYGON",
                "BINANCE",
                "REDBELLY",
                "BITLAYER",
                "ETH",
                "STACKS",
                "XRPLSIDECHAIN",
                "NEAR",
                "SKALE",
                "BASE",
                "LINEA",
                "SOLANA"
              ]
            },
            "description": {
              "type": "string",
              "description": "The description of the chain"
            },
            "icon": {
              "type": "string",
              "description": "The URL to the chain's icon"
            }
          },
          "required": [
            "type",
            "description",
            "icon"
          ]
        },
        "GetAllChainsDto": {
          "type": "object",
          "properties": {
            "data": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/ChainDto"
              }
            },
            "currentPage": {
              "type": "number"
            },
            "totalPages": {
              "type": "number"
            },
            "hasNextPage": {
              "type": "boolean"
            },
            "hasPreviousPage": {
              "type": "boolean"
            },
            "nextPage": {
              "type": "number"
            },
            "previousPage": {
              "type": "number"
            },
            "limit": {
              "type": "number"
            },
            "totalDocuments": {
              "type": "number"
            }
          },
          "required": [
            "data",
            "currentPage",
            "totalPages",
            "hasNextPage",
            "hasPreviousPage",
            "nextPage",
            "previousPage",
            "limit",
            "totalDocuments"
          ]
        },
        "CreateTokenDto": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "description": "The name of the token"
            },
            "description": {
              "type": "string",
              "description": "The description of the token"
            },
            "icon": {
              "type": "string",
              "description": "The URL to the token's icon"
            },
            "symbol": {
              "type": "string",
              "description": "The symbol of the token"
            },
            "network": {
              "type": "string",
              "description": "Network type"
            },
            "decimals": {
              "type": "number",
              "description": "The number of decimals"
            },
            "rpcUrl": {
              "type": "string",
              "description": "The URL to the token's Rate RPC endpoint"
            },
            "apiUrl": {
              "type": "string",
              "description": "The URL to the token's Rate API endpoint"
            },
            "contractAddress": {
              "type": "string",
              "description": "The contract address of the custom token",
              "default": "0x0000000000000000000000000000000000000000"
            },
            "isActive": {
              "type": "boolean",
              "description": "Active status"
            },
            "isCustom": {
              "type": "boolean",
              "description": "Is Token Custom?"
            },
            "chainId": {
              "type": "string",
              "description": "The id of the chain"
            },
            "shopIds": {
              "description": "The ids of the shops",
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          "required": [
            "name",
            "symbol",
            "network",
            "decimals",
            "chainId"
          ]
        },
        "TokenDto": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string"
            },
            "name": {
              "type": "string"
            },
            "description": {
              "type": "string"
            },
            "icon": {
              "type": "string"
            },
            "symbol": {
              "type": "string"
            },
            "network": {
              "type": "string"
            },
            "decimals": {
              "type": "number"
            },
            "rpcUrl": {
              "type": "string"
            },
            "apiUrl": {
              "type": "string"
            },
            "contractAddress": {
              "type": "string"
            },
            "isNative": {
              "type": "boolean"
            },
            "isCustom": {
              "type": "boolean"
            },
            "isActive": {
              "type": "boolean"
            },
            "chainId": {
              "$ref": "#/components/schemas/ChainDto"
            },
            "shopId": {
              "type": "object"
            },
            "createdAt": {
              "format": "date-time",
              "type": "string"
            },
            "updatedAt": {
              "format": "date-time",
              "type": "string"
            }
          },
          "required": [
            "_id",
            "name",
            "description",
            "icon",
            "symbol",
            "network",
            "decimals",
            "contractAddress",
            "isNative",
            "isCustom",
            "isActive",
            "chainId",
            "shopId",
            "createdAt",
            "updatedAt"
          ]
        },
        "UpdateTokenDto": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "description": "The name of the token"
            },
            "description": {
              "type": "string",
              "description": "The description of the token"
            },
            "icon": {
              "type": "string",
              "description": "The URL to the token's icon"
            },
            "symbol": {
              "type": "string",
              "description": "The symbol of the token"
            },
            "network": {
              "type": "string",
              "description": "Network type"
            },
            "decimals": {
              "type": "number",
              "description": "The number of decimals"
            },
            "rpcUrl": {
              "type": "string",
              "description": "The URL to the token's Rate RPC endpoint"
            },
            "apiUrl": {
              "type": "string",
              "description": "The URL to the token's Rate API endpoint"
            },
            "contractAddress": {
              "type": "string",
              "description": "The contract address of the custom token"
            },
            "isActive": {
              "type": "boolean",
              "description": "Active status"
            },
            "isCustom": {
              "type": "boolean",
              "description": "Is Token Custom?"
            },
            "chainId": {
              "type": "string",
              "description": "The id of the chain"
            },
            "shopIds": {
              "description": "The ids of the shops",
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          }
        },
        "GetAllTokensDto": {
          "type": "object",
          "properties": {
            "data": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/TokenDto"
              }
            },
            "currentPage": {
              "type": "number"
            },
            "totalPages": {
              "type": "number"
            },
            "hasNextPage": {
              "type": "boolean"
            },
            "hasPreviousPage": {
              "type": "boolean"
            },
            "nextPage": {
              "type": "number"
            },
            "previousPage": {
              "type": "number"
            },
            "limit": {
              "type": "number"
            },
            "totalDocuments": {
              "type": "number"
            }
          },
          "required": [
            "data",
            "currentPage",
            "totalPages",
            "hasNextPage",
            "hasPreviousPage",
            "nextPage",
            "previousPage",
            "limit",
            "totalDocuments"
          ]
        },
        "UpdateTokenStatusDto": {
          "type": "object",
          "properties": {
            "status": {
              "type": "boolean",
              "description": "The Token New Status"
            }
          }
        },
        "PasswordDto": {
          "type": "object",
          "properties": {
            "password": {
              "type": "string"
            }
          },
          "required": [
            "password"
          ]
        },
        "CreateSubscriptionDto": {
          "type": "object",
          "properties": {
            "month": {
              "type": "number",
              "description": "Amount of month to charge",
              "example": 60
            },
            "subId": {
              "type": "string",
              "description": "subscription id"
            },
            "recurring": {
              "type": "boolean",
              "description": "if charging should happen every month",
              "example": true
            }
          },
          "required": [
            "month",
            "subId",
            "recurring"
          ]
        },
        "ChargeSubscriptionResponseDto": {
          "type": "object",
          "properties": {
            "transactionId": {
              "type": "string",
              "description": "Transaction identifier",
              "example": "60d21b4667d0d8992e610c85"
            },
            "clientSecret": {
              "type": "string",
              "description": "Stripe client secret for payment processing",
              "example": "pi_3Nk2Lv2eZvKYlo2C1g6M1g6M_secret_..."
            },
            "amount": {
              "type": "number",
              "description": "Payment amount in the specified currency",
              "example": 99.99
            },
            "paymentIntentId": {
              "type": "string",
              "description": "Stripe payment intent identifier",
              "example": "pi_3Nk2Lv2eZvKYlo2C1g6M1g6M"
            }
          },
          "required": [
            "transactionId",
            "clientSecret",
            "amount",
            "paymentIntentId"
          ]
        },
        "SubscriptionCryptoDataDTO": {
          "type": "object",
          "properties": {
            "month": {
              "type": "number",
              "description": "Amount of month to charge",
              "example": 60
            },
            "subId": {
              "type": "string",
              "description": "subscription id"
            },
            "recurring": {
              "type": "boolean",
              "description": "if charging should happen every month",
              "example": true
            }
          },
          "required": [
            "month",
            "subId",
            "recurring"
          ]
        },
        "SubscryptionPaymentDataDTO": {
          "type": "object",
          "properties": {
            "deploy_hash": {
              "type": "string",
              "example": "0x68213890d155f1ef9990e9d9fb8ed9f7cdb014c5c2f24a84b4807a0ac50aa040"
            },
            "cryptoAmount": {
              "type": "number",
              "example": 125.53424
            },
            "subscriptionId": {
              "type": "string",
              "example": "6332a65d26038728b5aa9e43"
            },
            "recurring": {
              "type": "boolean",
              "example": false
            },
            "walletAddress": {
              "type": "string",
              "example": "0x0"
            }
          },
          "required": [
            "deploy_hash",
            "cryptoAmount",
            "subscriptionId",
            "recurring",
            "walletAddress"
          ]
        },
        "GeneralInfoResponseDto": {
          "type": "object",
          "properties": {
            "totalRegisteredUsers": {
              "type": "number",
              "description": "Total number of registered users"
            },
            "totalVerifiedShops": {
              "type": "number",
              "description": "Total number of verified shops"
            },
            "totalOrders": {
              "type": "number",
              "description": "Total number of orders"
            },
            "totalPaidOrders": {
              "type": "number",
              "description": "Total number of paid orders"
            },
            "totalEarnings": {
              "type": "number",
              "description": "Total earnings from paid orders"
            },
            "totalUniqueCustomers": {
              "type": "number",
              "description": "Total number of unique customers"
            },
            "totalProducts": {
              "type": "number",
              "description": "Total number of products"
            },
            "totalMintedNfts": {
              "type": "number",
              "description": "Total number of minted NFTs"
            },
            "totalCircleWallets": {
              "type": "number",
              "description": "Total number of Circle wallets"
            },
            "totalCompletedD3Users": {
              "type": "number",
              "description": "Total number of completed D3 users"
            },
            "totalCompletedUDUsers": {
              "type": "number",
              "description": "Total number of completed UD users"
            },
            "totalSoldSubscriptions": {
              "type": "number",
              "description": "Total number of sold subscriptions"
            }
          },
          "required": [
            "totalRegisteredUsers",
            "totalVerifiedShops",
            "totalOrders",
            "totalPaidOrders",
            "totalEarnings",
            "totalUniqueCustomers",
            "totalProducts",
            "totalMintedNfts",
            "totalCircleWallets",
            "totalCompletedD3Users",
            "totalCompletedUDUsers",
            "totalSoldSubscriptions"
          ]
        },
        "PaginationResponseDto": {
          "type": "object",
          "properties": {}
        },
        "ShopDetailsResponseDto": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "example": "my-shop"
            },
            "logo": {
              "type": "string",
              "example": "https://example.com/logo.png"
            },
            "address": {
              "type": "string",
              "example": "123 Main St, City, Country"
            },
            "email": {
              "type": "string",
              "example": "shop@example.com"
            },
            "totalOrders": {
              "type": "number",
              "example": 150
            },
            "activeSubscription": {
              "type": "string",
              "example": "ACTIVE"
            },
            "totalProducts": {
              "type": "number",
              "example": 45
            }
          },
          "required": [
            "name",
            "logo",
            "address",
            "email",
            "totalOrders",
            "activeSubscription",
            "totalProducts"
          ]
        },
        "AddTokenBasedPricingDto": {
          "type": "object",
          "properties": {
            "shopName": {
              "type": "string",
              "example": "shop name"
            },
            "token": {
              "type": "string",
              "example": "MEW"
            },
            "tokenSign": {
              "type": "string",
              "example": "token sign"
            }
          },
          "required": [
            "shopName",
            "token",
            "tokenSign"
          ]
        },
        "AddAdminCollectionDto": {
          "type": "object",
          "properties": {
            "collectionId": {
              "type": "string",
              "example": "635683fabc0fdb7d686a879b",
              "description": "Collection ID"
            },
            "name": {
              "type": "string",
              "example": "Default Collection",
              "description": "Collection name"
            }
          },
          "required": [
            "collectionId",
            "name"
          ]
        },
        "CreateShopDto": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string",
              "description": "User email",
              "example": "user@example.com"
            },
            "password": {
              "type": "string",
              "description": "User password",
              "minLength": 8,
              "example": "password123"
            },
            "shopName": {
              "type": "string",
              "description": "Shop name",
              "example": "My Shop"
            },
            "collectionId": {
              "type": "string",
              "description": "Collection ID",
              "example": "6649940d23afb1412251b85d"
            },
            "logo": {
              "type": "string",
              "description": "logo",
              "example": "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/3d69187f966966a6f9c54b1bc806349a79977d9926feac9fa30c4fee7c0db678.jpg_or.jpg"
            }
          },
          "required": [
            "email",
            "password",
            "shopName",
            "collectionId",
            "logo"
          ]
        },
        "ActiveEnterpriseDto": {
          "type": "object",
          "properties": {
            "shopName": {
              "type": "string"
            },
            "planName": {
              "type": "string",
              "enum": [
                "STARTER",
                "BASIC",
                "BUSINESS",
                "BUSINESS_PRO",
                "ENTERPRISE"
              ]
            },
            "monthLength": {
              "type": "number"
            },
            "price": {
              "type": "number"
            }
          },
          "required": [
            "shopName",
            "planName",
            "monthLength"
          ]
        },
        "CreateChangelogDto": {
          "type": "object",
          "properties": {
            "title": {
              "type": "string",
              "example": "Version 2.0.0",
              "description": "Title of the changelog entry"
            },
            "summary": {
              "type": "string",
              "example": "Major update with new features",
              "description": "Summary of changes"
            },
            "description": {
              "type": "string",
              "example": "Detailed description of all changes in this version",
              "description": "Full description of changes"
            },
            "tags": {
              "type": "array",
              "example": [
                "New Feature",
                "Bugfix"
              ],
              "description": "Tags categorizing the changes",
              "items": {
                "type": "string",
                "enum": [
                  "Integration",
                  "New Feature",
                  "Improvement",
                  "Bugfix"
                ]
              }
            },
            "version": {
              "type": "string",
              "example": "2.0.0",
              "description": "Version number"
            },
            "date": {
              "format": "date-time",
              "type": "string",
              "example": "2024-03-20",
              "description": "Date of the release"
            }
          },
          "required": [
            "title",
            "summary",
            "description",
            "tags",
            "version",
            "date"
          ]
        },
        "Changelog": {
          "type": "object",
          "properties": {
            "title": {
              "type": "string",
              "example": "Version 2.0.0",
              "description": "Title of the changelog entry"
            },
            "summary": {
              "type": "string",
              "example": "Major update with new features",
              "description": "Summary of changes"
            },
            "description": {
              "type": "string",
              "example": "Detailed description of all changes in this version",
              "description": "Full description of changes"
            },
            "tags": {
              "type": "array",
              "example": [
                "New Feature",
                "Bugfix"
              ],
              "description": "Tags categorizing the changes",
              "items": {
                "type": "string",
                "enum": [
                  "Integration",
                  "New Feature",
                  "Improvement",
                  "Bugfix"
                ]
              }
            },
            "version": {
              "type": "string",
              "example": "2.0.0",
              "description": "Version number"
            },
            "date": {
              "format": "date-time",
              "type": "string",
              "example": "2024-03-20",
              "description": "Date of the release"
            }
          },
          "required": [
            "title",
            "summary",
            "description",
            "tags",
            "version",
            "date"
          ]
        },
        "UpdateChangelogDto": {
          "type": "object",
          "properties": {
            "title": {
              "type": "string",
              "example": "Version 2.0.0",
              "description": "Title of the changelog entry"
            },
            "summary": {
              "type": "string",
              "example": "Major update with new features",
              "description": "Summary of changes"
            },
            "description": {
              "type": "string",
              "example": "Detailed description of all changes in this version",
              "description": "Full description of changes"
            },
            "tags": {
              "type": "array",
              "example": [
                "New Feature",
                "Bugfix"
              ],
              "description": "Tags categorizing the changes",
              "items": {
                "type": "string",
                "enum": [
                  "Integration",
                  "New Feature",
                  "Improvement",
                  "Bugfix"
                ]
              }
            },
            "version": {
              "type": "string",
              "example": "2.0.0",
              "description": "Version number"
            },
            "date": {
              "format": "date-time",
              "type": "string",
              "example": "2024-03-20",
              "description": "Date of the release"
            }
          }
        },
        "BlogListResponseDto": {
          "type": "object",
          "properties": {
            "currentPage": {
              "type": "string",
              "description": "Current page number as string"
            },
            "hasNextPage": {
              "type": "boolean",
              "description": "Whether there is a next page"
            },
            "hasPreviousPage": {
              "type": "boolean",
              "description": "Whether there is a previous page"
            },
            "limit": {
              "type": "string",
              "description": "Number of items per page as string"
            },
            "nextPage": {
              "type": "number",
              "description": "Next page number",
              "nullable": true
            },
            "previousPage": {
              "type": "number",
              "description": "Previous page number",
              "nullable": true
            },
            "totalDocuments": {
              "type": "number",
              "description": "Total number of documents"
            },
            "totalPages": {
              "type": "number",
              "description": "Total number of pages"
            },
            "data": {
              "description": "Array of blogs",
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          "required": [
            "currentPage",
            "hasNextPage",
            "hasPreviousPage",
            "limit",
            "nextPage",
            "previousPage",
            "totalDocuments",
            "totalPages",
            "data"
          ]
        },
        "Blog": {
          "type": "object",
          "properties": {
            "title": {
              "type": "string",
              "description": "Title of the post",
              "example": "How to Create a Blog"
            },
            "slug": {
              "type": "string",
              "description": "Unique slug for the post",
              "example": "how-to-create-a-blog"
            },
            "content": {
              "type": "string",
              "description": "Content of the post",
              "example": "This is a detailed guide on creating a blog..."
            },
            "shopID": {
              "description": "Shop associated with the post",
              "example": "605c72ef3e6318003418322f",
              "allOf": [
                {
                  "$ref": "#/components/schemas/ObjectId"
                }
              ]
            },
            "writer": {
              "type": "string",
              "description": "Writer of the post",
              "example": "Alex"
            },
            "isVisible": {
              "type": "boolean",
              "description": "Whether the post is visible to readers",
              "example": true
            },
            "image": {
              "type": "string",
              "description": "Image link in CDN",
              "example": "https://cdn.example.com/image.jpg"
            },
            "tags": {
              "description": "List of tags associated with the post",
              "example": [
                "tech",
                "new release",
                "gadgets"
              ],
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "searchEngineSummary": {
              "type": "string",
              "description": "Search engine summary of the post",
              "example": "A brief summary for search engines"
            },
            "category": {
              "type": "string",
              "description": "Category of the post",
              "example": "Technology"
            },
            "readTime": {
              "type": "number",
              "description": "Estimated read time in minutes",
              "example": 5
            },
            "isFeatured": {
              "type": "boolean",
              "description": "Whether the post is featured",
              "example": true
            },
            "creator": {
              "type": "string",
              "description": "Creator of the post",
              "enum": [
                "SUPER_ADMIN",
                "PRODUCER"
              ],
              "example": "PRODUCER"
            },
            "createdAt": {
              "format": "date-time",
              "type": "string",
              "description": "Creation date of the post",
              "example": "2021-04-05T14:48:00.000Z"
            },
            "updatedAt": {
              "format": "date-time",
              "type": "string",
              "description": "Last update date of the post",
              "example": "2021-04-05T14:48:00.000Z"
            }
          },
          "required": [
            "title",
            "slug",
            "content",
            "shopID",
            "writer",
            "isVisible",
            "image",
            "tags",
            "searchEngineSummary",
            "category",
            "readTime",
            "isFeatured",
            "creator",
            "createdAt",
            "updatedAt"
          ]
        },
        "BlogDetailResponseDto": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string",
              "description": "Blog ID"
            },
            "title": {
              "type": "string",
              "description": "Blog title"
            },
            "slug": {
              "type": "string",
              "description": "Blog slug"
            },
            "content": {
              "type": "string",
              "description": "Blog content"
            },
            "shopID": {
              "type": "string",
              "description": "Shop ID"
            },
            "writer": {
              "type": "string",
              "description": "Blog writer name"
            },
            "isVisible": {
              "type": "boolean",
              "description": "Blog visibility status"
            },
            "image": {
              "type": "string",
              "description": "Blog image URL"
            },
            "tags": {
              "description": "Blog tags",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "searchEngineSummary": {
              "type": "string",
              "description": "Blog search engine summary"
            },
            "category": {
              "type": "string",
              "description": "Blog category"
            },
            "readTime": {
              "type": "number",
              "description": "Blog read time in minutes"
            },
            "isFeatured": {
              "type": "boolean",
              "description": "Blog featured status"
            },
            "creator": {
              "type": "string",
              "description": "Blog creator type"
            },
            "createdAt": {
              "format": "date-time",
              "type": "string",
              "description": "Blog creation date"
            },
            "updatedAt": {
              "format": "date-time",
              "type": "string",
              "description": "Blog last update date"
            }
          },
          "required": [
            "_id",
            "title",
            "slug",
            "content",
            "shopID",
            "writer",
            "isVisible",
            "image",
            "tags",
            "searchEngineSummary",
            "category",
            "readTime",
            "isFeatured",
            "creator",
            "createdAt",
            "updatedAt"
          ]
        },
        "UpdateBlogByIdDto": {
          "type": "object",
          "properties": {
            "title": {
              "type": "string",
              "description": "Blog title"
            },
            "content": {
              "type": "string",
              "description": "Blog content"
            },
            "isVisible": {
              "type": "boolean",
              "description": "Blog visibility status"
            },
            "image": {
              "type": "string",
              "description": "Blog image URL"
            },
            "tags": {
              "description": "Blog tags",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "searchEngineSummary": {
              "type": "string",
              "description": "Blog search engine summary"
            },
            "category": {
              "type": "string",
              "description": "Blog category"
            },
            "isFeatured": {
              "type": "boolean",
              "description": "Blog featured status"
            }
          }
        },
        "PublicBlogDetailResponseDto": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string",
              "description": "Blog ID"
            },
            "title": {
              "type": "string",
              "description": "Blog title"
            },
            "slug": {
              "type": "string",
              "description": "Blog slug"
            },
            "content": {
              "type": "string",
              "description": "Blog content"
            },
            "shopID": {
              "type": "string",
              "description": "Shop ID"
            },
            "writer": {
              "type": "string",
              "description": "Blog writer name"
            },
            "isVisible": {
              "type": "boolean",
              "description": "Blog visibility status"
            },
            "image": {
              "type": "string",
              "description": "Blog image URL"
            },
            "tags": {
              "description": "Blog tags",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "searchEngineSummary": {
              "type": "string",
              "description": "Blog search engine summary"
            },
            "category": {
              "type": "string",
              "description": "Blog category"
            },
            "readTime": {
              "type": "number",
              "description": "Blog read time in minutes"
            },
            "isFeatured": {
              "type": "boolean",
              "description": "Blog featured status"
            },
            "createdAt": {
              "format": "date-time",
              "type": "string",
              "description": "Blog creation date"
            },
            "updatedAt": {
              "format": "date-time",
              "type": "string",
              "description": "Blog last update date"
            }
          },
          "required": [
            "_id",
            "title",
            "slug",
            "content",
            "shopID",
            "writer",
            "isVisible",
            "image",
            "tags",
            "searchEngineSummary",
            "category",
            "readTime",
            "isFeatured",
            "createdAt",
            "updatedAt"
          ]
        },
        "PublicBlogListResponseDto": {
          "type": "object",
          "properties": {
            "featured": {
              "description": "Featured blogs (3 featured or latest blogs)",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "recent": {
              "description": "Recent blogs (3 latest blogs)",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "moreToDiscover": {
              "type": "object",
              "description": "All blogs with pagination"
            }
          },
          "required": [
            "featured",
            "recent",
            "moreToDiscover"
          ]
        },
        "CreateApiKeyDto": {
          "type": "object",
          "properties": {
            "key": {
              "type": "string",
              "example": "event api Key"
            }
          },
          "required": [
            "key"
          ]
        },
        "ApiKey": {
          "type": "object",
          "properties": {}
        },
        "CheckApiKeyDto": {
          "type": "object",
          "properties": {
            "key": {
              "type": "string",
              "example": "event api Key"
            }
          },
          "required": [
            "key"
          ]
        },
        "EventIdsDto": {
          "type": "object",
          "properties": {
            "eventIds": {
              "example": [
                "65c277e206122809242143a1",
                "65c277e206122809242143a1"
              ],
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          "required": [
            "eventIds"
          ]
        },
        "CreateGamificationCategoryDto": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "example": "Onboarding",
              "description": "Title of Gamification Category"
            },
            "description": {
              "type": "string",
              "description": "The description of the category"
            },
            "icon": {
              "type": "string",
              "description": "The URL to the category icon"
            },
            "isActive": {
              "type": "boolean",
              "description": "Whether the category is active"
            }
          },
          "required": [
            "name",
            "description",
            "icon",
            "isActive"
          ]
        },
        "GamificationCategoryDto": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string"
            },
            "isCompleted": {
              "type": "boolean"
            },
            "completionTime": {
              "format": "date-time",
              "type": "string"
            },
            "gamificationMissionId": {
              "type": "string"
            },
            "userId": {
              "type": "string"
            },
            "shopId": {
              "type": "string"
            },
            "createdAt": {
              "format": "date-time",
              "type": "string"
            },
            "updatedAt": {
              "format": "date-time",
              "type": "string"
            }
          },
          "required": [
            "_id",
            "isCompleted",
            "completionTime",
            "gamificationMissionId",
            "userId",
            "shopId",
            "createdAt",
            "updatedAt"
          ]
        },
        "CreateGamificationRewardDto": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "description": "Reward Type",
              "enum": [
                "CREDIT",
                "SUBSCRIPTION"
              ]
            },
            "value": {
              "type": "object",
              "examples": [
                12,
                "66819d8ad066fbe1ec6bfed4"
              ],
              "description": "Value of the reward."
            },
            "description": {
              "type": "string",
              "description": "The description of the reward"
            },
            "icon": {
              "type": "string",
              "description": "The URL to the reward icon"
            },
            "isActive": {
              "type": "boolean",
              "description": "Active status"
            }
          },
          "required": [
            "type",
            "value"
          ]
        },
        "GamificationRewardDto": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string"
            },
            "type": {
              "type": "string"
            },
            "value": {
              "type": "object"
            },
            "description": {
              "type": "string"
            },
            "icon": {
              "type": "string"
            },
            "isActive": {
              "type": "boolean"
            },
            "createdAt": {
              "format": "date-time",
              "type": "string"
            },
            "updatedAt": {
              "format": "date-time",
              "type": "string"
            }
          },
          "required": [
            "_id",
            "type",
            "value",
            "description",
            "icon",
            "isActive",
            "createdAt",
            "updatedAt"
          ]
        },
        "CreateGamificationMissionDto": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "example": "Complete Profile",
              "description": "Title of Gamification Mission"
            },
            "description": {
              "type": "string",
              "description": "The description of the mission"
            },
            "icon": {
              "type": "string",
              "description": "The URL to the mission icon"
            },
            "resourceUrl": {
              "type": "string",
              "description": "The URL to the mission resource, Like link to create product"
            },
            "task": {
              "type": "string",
              "example": "ADD_AN_ADDRESS",
              "description": "The task associated with the mission"
            },
            "value": {
              "type": "object",
              "description": "in some actions for example following a certain page in instagram we need the target"
            },
            "isActive": {
              "type": "boolean",
              "description": "Whether the mission is active"
            },
            "rewards": {
              "description": "Array of reward Ids associated with the mission",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "categoryId": {
              "description": "The category id the mission belongs to",
              "allOf": [
                {
                  "$ref": "#/components/schemas/ObjectId"
                }
              ]
            },
            "isSubscriptionNeeded": {
              "type": "boolean",
              "description": "Whether a subscription is needed"
            },
            "subscriptionId": {
              "description": "The subscription ID if a subscription is needed",
              "allOf": [
                {
                  "$ref": "#/components/schemas/ObjectId"
                }
              ]
            }
          },
          "required": [
            "name",
            "description",
            "icon",
            "resourceUrl",
            "task",
            "value",
            "isActive",
            "rewards",
            "categoryId",
            "isSubscriptionNeeded",
            "subscriptionId"
          ]
        },
        "GamificationMissionDto": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string"
            },
            "name": {
              "type": "string"
            },
            "description": {
              "type": "string"
            },
            "icon": {
              "type": "string"
            },
            "resourceUrl": {
              "type": "string"
            },
            "task": {
              "type": "string"
            },
            "value": {
              "type": "string"
            },
            "isActive": {
              "type": "boolean"
            },
            "rewards": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "categoryId": {
              "type": "string"
            },
            "isSubscriptionNeeded": {
              "type": "boolean"
            },
            "subscriptionId": {
              "type": "string"
            }
          },
          "required": [
            "_id",
            "name",
            "description",
            "icon",
            "resourceUrl",
            "task",
            "value",
            "isActive",
            "rewards",
            "categoryId",
            "isSubscriptionNeeded",
            "subscriptionId"
          ]
        },
        "UpdateGamificationMissionDto": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "description": "Name of the mission"
            },
            "description": {
              "type": "string",
              "description": "Description of the mission"
            },
            "icon": {
              "type": "string",
              "description": "URL of the mission icon"
            },
            "resourceUrl": {
              "type": "string",
              "description": "The URL to the mission resource, Like link to create product"
            },
            "task": {
              "type": "string",
              "description": "Task type of the mission",
              "enum": [
                "ADD_AN_ADDRESS",
                "DESIGN_A_SHOP",
                "UPDATE_PAYMENT_AND_LOGIN_METHODS",
                "CREATE_FIRST_POD",
                "FIRST_SALE_FOR_POD_LISTING",
                "FIRST_SALE_FOR_M2M_LISTING",
                "CREATE_PRODUCT_TILE",
                "FIRST_SALE_THROUGH_PRODUCT_TILE",
                "LIST_PHYSICAL_GOOD_FOR_SALE",
                "FIRST_SALE_OF_PHYSICAL_GOOD",
                "RECORD_SKU",
                "GET_AFFILIATE_REQUEST_AND_ACCEPT_IT",
                "AFFILIATED_PRODUCT_SOLD_BY_PARTNER_COSELLER",
                "RECORD_SKU_WITH_ROYALTY_ENABLED",
                "SECONDARY_SALE_FOR_RECORDED_PRODUCT",
                "SEND_AFFILIATE_REQUEST_AND_GET_ACCEPTED",
                "SELL_ON_CHAIN_AFFILIATE_PRODUCT_AS_COSELLER",
                "USE_CUSTOM_DOMAIN",
                "MERCHANT_SHOP_CREATED_THROUGH_YOUR_REFERRAL_CODE",
                "REFERRED_STORE_SELLS_AN_ITEM",
                "CREATE_PRODUCT_COLLECTIONS",
                "CREATE_NFT_RULESET_TO_GATE_COLLECTION",
                "CREATE_NFT_RULESET_CREATING_DISCOUNT_ON_COLLECTION",
                "CREATE_DIGITAL_GOOD",
                "SELL_DIGITAL_GOOD",
                "USE_THIRD_PARTY_API_INTEGRATIONS",
                "SELL_USING_EASYPOST_SHIPPING_ON_LISTING",
                "ACTIVATE_CUSTOM_SHIPPING_ON_LISTING",
                "CREATE_GIFTCARD_AND_SELL_ITEM_VIA_GC_REDEMPTION",
                "CREATE_FIRST_BLOG_POST",
                "HIT_N_VISITORS_A_DAY",
                "ADD_NFT_TO_WALLET"
              ]
            },
            "value": {
              "type": "string",
              "description": "Value associated with the mission"
            },
            "isActive": {
              "type": "boolean",
              "description": "Active status of the mission"
            },
            "rewards": {
              "description": "Array of reward IDs associated with the mission",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "categoryId": {
              "description": "Category ID associated with the mission",
              "allOf": [
                {
                  "$ref": "#/components/schemas/ObjectId"
                }
              ]
            },
            "isSubscriptionNeeded": {
              "type": "boolean",
              "description": "Flag indicating if a subscription is needed for the mission"
            },
            "subscriptionId": {
              "description": "ID of the subscription required for the mission",
              "allOf": [
                {
                  "$ref": "#/components/schemas/ObjectId"
                }
              ]
            }
          }
        },
        "TransferNftDto": {
          "type": "object",
          "properties": {}
        },
        "Object": {
          "type": "object",
          "properties": {}
        },
        "CreateAirdropDTO": {
          "type": "object",
          "properties": {
            "tokenAddress": {
              "type": "string",
              "example": "0x622b08CA78655DE036593f8CfC0F33f20A868634"
            },
            "tokenId": {
              "type": "string",
              "example": "1"
            },
            "receivers": {
              "example": [
                {
                  "receiver": "0x622b08CA78655DE036593f8CfC0F33f20A868634",
                  "amount": 1
                }
              ],
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "chain": {
              "type": "string",
              "example": "BASE"
            },
            "network": {
              "type": "string",
              "example": "TESTNET"
            }
          },
          "required": [
            "tokenAddress",
            "tokenId",
            "receivers",
            "chain",
            "network"
          ]
        },
        "TrackFollowDto": {
          "type": "object",
          "properties": {}
        },
        "SocialFollow": {
          "type": "object",
          "properties": {}
        },
        "ImproveTitleDto": {
          "type": "object",
          "properties": {
            "title": {
              "type": "string",
              "description": "Title to be improved",
              "example": "Wireless Bluetooth Headphones"
            },
            "tone": {
              "type": "string",
              "description": "Desired tone for the generated description. Available options: CASUAL, PROFESSIONAL, FRIENDLY, INSPIRATIONAL, LUXURY, TECH_SAVVY",
              "example": "TECH_SAVVY",
              "enum": [
                "CASUAL",
                "PROFESSIONAL",
                "FRIENDLY",
                "INSPIRATIONAL",
                "LUXURY",
                "TECH_SAVVY"
              ]
            }
          },
          "required": [
            "title",
            "tone"
          ]
        },
        "ImproveDescriptionDto": {
          "type": "object",
          "properties": {
            "title": {
              "type": "string",
              "description": "Title related to the description",
              "example": "Wireless Bluetooth Headphones"
            },
            "description": {
              "type": "string",
              "description": "Description to be improved",
              "example": "High-quality sound with noise cancellation"
            },
            "tone": {
              "type": "string",
              "description": "Desired tone for the generated description. Available options: CASUAL, PROFESSIONAL, FRIENDLY, INSPIRATIONAL, LUXURY, TECH_SAVVY",
              "example": "TECH_SAVVY",
              "enum": [
                "CASUAL",
                "PROFESSIONAL",
                "FRIENDLY",
                "INSPIRATIONAL",
                "LUXURY",
                "TECH_SAVVY"
              ]
            }
          },
          "required": [
            "tone"
          ]
        },
        "ImageDto": {
          "type": "object",
          "properties": {
            "imageUrl": {
              "type": "string",
              "description": "URL of the image to be processed.",
              "example": "https://example.com/path/to/image.jpg"
            }
          },
          "required": [
            "imageUrl"
          ]
        },
        "CreateHeroSectionDto": {
          "type": "object",
          "properties": {
            "prompt": {
              "type": "string",
              "description": "Description of the business for which to generate hero section images",
              "example": "An online bookstore specializing in rare and vintage books with a cozy, intellectual atmosphere"
            },
            "category": {
              "type": "string",
              "description": "Business category to help guide the image generation",
              "example": "books"
            }
          },
          "required": [
            "prompt",
            "category"
          ]
        },
        "CreateLogoDto": {
          "type": "object",
          "properties": {
            "prompt": {
              "type": "string",
              "description": "Description of the business for which to generate logo images",
              "example": "A modern tech startup focused on artificial intelligence and machine learning solutions"
            },
            "category": {
              "type": "string",
              "description": "Business category to help guide the logo generation",
              "example": "technology"
            }
          },
          "required": [
            "prompt",
            "category"
          ]
        },
        "CreateShopNameDto": {
          "type": "object",
          "properties": {
            "prompt": {
              "type": "string",
              "description": "Description of the business for which to generate shop name suggestions",
              "example": "An artisanal bakery specializing in French pastries and sourdough bread"
            }
          },
          "required": [
            "prompt"
          ]
        },
        "CreateDomainDto": {
          "type": "object",
          "properties": {
            "prompt": {
              "type": "string",
              "description": "Description of the business for which to generate domain name suggestions",
              "example": "A handmade jewelry store specializing in custom designs and ethically sourced gemstones"
            }
          },
          "required": [
            "prompt"
          ]
        },
        "ShopStats": {
          "type": "object",
          "properties": {
            "orders": {
              "type": "number",
              "example": 120,
              "description": "Total number of orders"
            },
            "totalRevenue": {
              "type": "number",
              "example": 10000,
              "description": "Total revenue generated"
            },
            "profit": {
              "type": "number",
              "example": 2500,
              "description": "Total profit generated"
            },
            "customers": {
              "type": "number",
              "example": 80,
              "description": "Unique customers count"
            }
          },
          "required": [
            "orders",
            "totalRevenue",
            "profit",
            "customers"
          ]
        },
        "RecentOrder": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string",
              "example": "63b1a2f0c8a8f77f12345678",
              "description": "Unique Order ID"
            },
            "updatedAt": {
              "format": "date-time",
              "type": "string",
              "example": "2024-02-02T12:00:00.000Z",
              "description": "Last updated date of the order"
            },
            "totalPriceCart": {
              "type": "number",
              "example": 250,
              "description": "Total amount of the order"
            },
            "status": {
              "type": "string",
              "example": "CONFIRMED",
              "description": "Current order status"
            }
          },
          "required": [
            "_id",
            "updatedAt",
            "totalPriceCart",
            "status"
          ]
        },
        "DashboardData": {
          "type": "object",
          "properties": {
            "shopStats": {
              "$ref": "#/components/schemas/ShopStats"
            },
            "recentOrders": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/RecentOrder"
              }
            }
          },
          "required": [
            "shopStats",
            "recentOrders"
          ]
        },
        "SalesData": {
          "type": "object",
          "properties": {
            "date": {
              "type": "string",
              "example": "2024-02-01",
              "description": "Date or Month (e.g., day for weekly, month for monthly, year for yearly)"
            },
            "totalSales": {
              "type": "number",
              "example": 1500,
              "description": "Total sales for this day/month"
            },
            "affiliateSales": {
              "type": "number",
              "example": 800,
              "description": "Affiliate sales for this day/month"
            },
            "directSales": {
              "type": "number",
              "example": 700,
              "description": "Direct sales for this day/month"
            }
          },
          "required": [
            "date",
            "totalSales",
            "affiliateSales",
            "directSales"
          ]
        },
        "SalesReport": {
          "type": "object",
          "properties": {
            "salesData": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/SalesData"
              }
            },
            "period": {
              "type": "string",
              "enum": [
                "weekly",
                "monthly",
                "yearly"
              ],
              "description": "The period of the report (weekly, monthly, yearly)"
            },
            "startDate": {
              "type": "string",
              "example": "2024-01-01",
              "description": "Start date of the report period"
            },
            "endDate": {
              "type": "string",
              "example": "2024-01-07",
              "description": "End date of the report period"
            },
            "totalSalesInPeriod": {
              "type": "number",
              "example": 10500,
              "description": "Total sales within the specified date range"
            }
          },
          "required": [
            "salesData",
            "period",
            "startDate",
            "endDate",
            "totalSalesInPeriod"
          ]
        },
        "NetProfit": {
          "type": "object",
          "properties": {
            "total": {
              "type": "number",
              "description": "Total net profit",
              "example": 10000
            },
            "directSales": {
              "type": "number",
              "description": "Net profit from direct sales",
              "example": 8000
            },
            "affiliateSales": {
              "type": "number",
              "description": "Net profit from affiliate sales",
              "example": 2000
            }
          },
          "required": [
            "total",
            "directSales",
            "affiliateSales"
          ]
        },
        "CustomerStats": {
          "type": "object",
          "properties": {
            "total": {
              "type": "number",
              "description": "Total number of customers",
              "example": 500
            },
            "directCustomers": {
              "type": "number",
              "description": "Number of direct customers",
              "example": 300
            },
            "affiliateCustomers": {
              "type": "number",
              "description": "Number of affiliate customers",
              "example": 200
            }
          },
          "required": [
            "total",
            "directCustomers",
            "affiliateCustomers"
          ]
        },
        "OrderStats": {
          "type": "object",
          "properties": {
            "totalOrders": {
              "type": "number",
              "description": "Total number of orders",
              "example": 2000
            },
            "directOrders": {
              "type": "number",
              "description": "Number of direct orders",
              "example": 1500
            },
            "affiliateOrders": {
              "type": "number",
              "description": "Number of affiliate orders",
              "example": 500
            }
          },
          "required": [
            "totalOrders",
            "directOrders",
            "affiliateOrders"
          ]
        },
        "ProductBreakdown": {
          "type": "object",
          "properties": {
            "productType": {
              "type": "string",
              "description": "Type of product (e.g., Physical Products, Digital Goods, etc.)"
            },
            "totalValue": {
              "type": "number",
              "description": "Total sales value for this product type",
              "example": 5000
            },
            "quantity": {
              "type": "number",
              "description": "Quantity of this product type in inventory",
              "example": 100
            },
            "percentageOfTotal": {
              "type": "number",
              "description": "Percentage of total products represented by this product type",
              "example": 25
            }
          },
          "required": [
            "productType",
            "totalValue",
            "quantity",
            "percentageOfTotal"
          ]
        },
        "ShopPerformanceData": {
          "type": "object",
          "properties": {
            "netProfit": {
              "description": "Net profit breakdown",
              "allOf": [
                {
                  "$ref": "#/components/schemas/NetProfit"
                }
              ]
            },
            "customers": {
              "description": "Customer breakdown",
              "allOf": [
                {
                  "$ref": "#/components/schemas/CustomerStats"
                }
              ]
            },
            "orders": {
              "description": "Order breakdown",
              "allOf": [
                {
                  "$ref": "#/components/schemas/OrderStats"
                }
              ]
            },
            "visitors": {
              "type": "string",
              "description": "Total number of visitors",
              "example": 10000
            },
            "totalInventoryValue": {
              "type": "number",
              "description": "Total value of the inventory",
              "example": 50000
            },
            "numberOfProducts": {
              "type": "number",
              "description": "Total number of products in the shop",
              "example": 1000
            },
            "productBreakdown": {
              "description": "Breakdown of products by type",
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/ProductBreakdown"
              }
            }
          },
          "required": [
            "netProfit",
            "customers",
            "orders",
            "visitors",
            "totalInventoryValue",
            "numberOfProducts",
            "productBreakdown"
          ]
        },
        "CheckShopNameDto": {
          "type": "object",
          "properties": {
            "shopName": {
              "type": "string",
              "example": "alex"
            }
          },
          "required": [
            "shopName"
          ]
        },
        "ShopDesign": {
          "type": "object",
          "properties": {}
        },
        "UpdateShopDTO": {
          "type": "object",
          "properties": {
            "description": {
              "type": "string",
              "example": "nike shop - germany",
              "description": "shop description"
            },
            "logo": {
              "type": "string",
              "example": "logo url",
              "description": "logo"
            },
            "discordURL": {
              "type": "string",
              "example": "https://discord.gg/NPGprF27",
              "description": "discord url"
            },
            "instagramURL": {
              "type": "string",
              "example": "https://www.instagram.com/nike",
              "description": "instagram url"
            },
            "twitterURL": {
              "type": "string",
              "example": "https://twitter.com/nike",
              "description": "twitter url"
            },
            "facebookURL": {
              "type": "string",
              "description": "facebook url"
            },
            "linkedinURL": {
              "type": "string",
              "description": "linkedin url"
            },
            "tiktokURL": {
              "type": "string",
              "description": "tiktok url"
            },
            "webURL": {
              "type": "string",
              "example": "weburl",
              "description": "web url"
            },
            "addressBookID": {
              "type": "string",
              "example": "636fd84d0a7a1ec1a6d66e33",
              "description": "address book id"
            },
            "templateID": {
              "type": "string",
              "example": "636fd84d0a7a1ec1a6d66e33",
              "description": "template id"
            },
            "shopifyDomain": {
              "type": "string",
              "example": "myshopify.test.com",
              "description": "It is a shopify domain"
            },
            "headerIcon": {
              "type": "string",
              "description": "It is a header icon"
            },
            "textColor": {
              "type": "string",
              "description": "It is a text color"
            },
            "backgroundColor": {
              "type": "string",
              "description": "It is a background color"
            },
            "theme": {
              "type": "string",
              "description": "It is a text color"
            },
            "backgroundText": {
              "type": "string",
              "description": "It is a background text"
            },
            "backgroundImage": {
              "type": "string",
              "description": "It is an image address"
            },
            "backgroundImageSecondary": {
              "type": "string",
              "description": "It is an background image secondary address"
            },
            "infoEmail": {
              "type": "string",
              "description": "It is just an info email address that it will show on profile shop as contact"
            },
            "imsType": {
              "type": "string",
              "description": "Shop IMS type",
              "enum": [
                "DROPLINKED",
                "SHOPIFY"
              ]
            },
            "productSectionText": {
              "type": "string",
              "description": "product section text"
            },
            "fullWidthHero": {
              "type": "boolean",
              "description": "full width hero condition"
            },
            "tags": {
              "description": "Shop Tags",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "template_options": {
              "type": "object"
            },
            "shopDesign": {
              "description": "shop design data",
              "allOf": [
                {
                  "$ref": "#/components/schemas/ShopDesign"
                }
              ]
            },
            "telegramURL": {
              "type": "string",
              "example": "https://telegram.or/nike",
              "description": "tele url"
            },
            "messengerURL": {
              "type": "string",
              "example": "https://messenger.com/nike",
              "description": "messenger url"
            },
            "youtubeURL": {
              "type": "string",
              "example": "https://youtube.com/nike",
              "description": "YT url"
            },
            "loginMethods": {
              "type": "object",
              "description": "supported wallets"
            },
            "pre_purchase_data_fetch": {
              "type": "object",
              "example": {
                "active": true,
                "title": "please type your wallet address"
              }
            },
            "paymentMethods": {
              "type": "object",
              "description": "supported wallets"
            },
            "paymentWallets": {
              "type": "object",
              "description": "paymentWallets"
            },
            "productDisplayByCollection": {
              "type": "boolean",
              "description": "display products by collection in shop",
              "example": false
            },
            "currencyAbbreviation": {
              "type": "string",
              "description": "Currency abbreviation of the shop",
              "example": "USD"
            },
            "launchDate": {
              "format": "date-time",
              "type": "string",
              "example": "2024-07-01T13:13:54.936Z",
              "description": "New expiration date"
            },
            "productTileStyle": {
              "type": "object",
              "description": "product tile design"
            },
            "isAgeRestricted": {
              "type": "boolean",
              "description": "Indicates if the shop has an age restriction of 18+"
            },
            "isCatalogMode": {
              "type": "boolean",
              "description": "Indicates if the shop is in catalog mode"
            }
          }
        },
        "NotFoundException": {
          "type": "object",
          "properties": {}
        },
        "UpdateExternalShopDto": {
          "type": "object",
          "properties": {
            "backgroundText": {
              "type": "string"
            },
            "backgroundImage": {
              "type": "string"
            },
            "logo": {
              "type": "string"
            },
            "headerIcon": {
              "type": "string"
            }
          },
          "required": [
            "backgroundText",
            "backgroundImage",
            "logo",
            "headerIcon"
          ]
        },
        "ChargeShopCreditDto": {
          "type": "object",
          "properties": {
            "amount": {
              "type": "number",
              "description": "Amount to charge",
              "example": 500
            }
          },
          "required": [
            "amount"
          ]
        },
        "ChargeShopCreditResponseDto": {
          "type": "object",
          "properties": {
            "transactionId": {
              "type": "string"
            },
            "clientSecret": {
              "type": "string"
            }
          },
          "required": [
            "transactionId",
            "clientSecret"
          ]
        },
        "ShopCreditTransaction": {
          "type": "object",
          "properties": {
            "shopId": {
              "type": "object",
              "example": "64f05831348ca9a75f20ecda"
            },
            "userId": {
              "type": "object"
            },
            "amount": {
              "type": "number",
              "example": 13.3,
              "description": "Credit amount changed"
            },
            "previousAmount": {
              "type": "number",
              "example": 100,
              "description": "Previous credit amount"
            },
            "newAmount": {
              "type": "number",
              "example": 113.3,
              "description": "New credit amount"
            },
            "status": {
              "type": "string",
              "example": "SUCCESS",
              "description": "Transaction status",
              "enum": [
                "PENDING",
                "SUCCESS",
                "TIMEDOUT"
              ]
            },
            "amountType": {
              "type": "string",
              "example": "INCREASE",
              "description": "Transaction amount TYPE",
              "enum": [
                "INCREASE",
                "DECREASE"
              ]
            },
            "type": {
              "type": "string",
              "example": "CREDIT_BALANCE",
              "description": "Transaction TYPE",
              "enum": [
                "ORDER",
                "CREDIT_BALANCE",
                "AFFILIATE_SHARE",
                "SUBSCRIPTION_UPDATE",
                "GAMIFICATION_REWARD",
                "WITHDRAW",
                "REFERRAL",
                "CUSTOMER_SUPPORT_FEE",
                "BULK_ORDER",
                "MANUAL_CREDIT_ADJUSTMENT",
                "SUBSCRIPTION_RENEWAL"
              ]
            },
            "stripePaymentIntentId": {
              "type": "string",
              "example": "tx_123",
              "description": "External transaction ID"
            },
            "withdrawType": {
              "type": "string",
              "example": "CIRCLE_SELF_WALLET",
              "description": "Withdraw TYPE",
              "enum": [
                "CIRCLE_SELF_WALLET",
                "CIRCLE_SELF"
              ]
            },
            "orderId": {
              "type": "object",
              "description": "Associated order ID"
            },
            "details": {
              "type": "object",
              "description": "Additional transaction details"
            }
          },
          "required": [
            "shopId",
            "userId",
            "amount",
            "previousAmount",
            "newAmount",
            "status",
            "amountType",
            "type",
            "stripePaymentIntentId",
            "withdrawType",
            "orderId",
            "details"
          ]
        },
        "CreditTransactionsResponseDto": {
          "type": "object",
          "properties": {
            "data": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/ShopCreditTransaction"
              }
            },
            "currentPage": {
              "type": "number"
            },
            "totalPages": {
              "type": "number"
            },
            "hasNextPage": {
              "type": "boolean"
            },
            "hasPreviousPage": {
              "type": "boolean"
            },
            "nextPage": {
              "type": "number"
            },
            "previousPage": {
              "type": "number"
            },
            "limit": {
              "type": "number"
            },
            "totalDocuments": {
              "type": "number"
            }
          },
          "required": [
            "data",
            "currentPage",
            "totalPages",
            "hasNextPage",
            "hasPreviousPage",
            "nextPage",
            "previousPage",
            "limit",
            "totalDocuments"
          ]
        },
        "CreateOrUpdateShopOAuth2ClientDto": {
          "type": "object",
          "properties": {
            "domains": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "redirectUrl": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          "required": [
            "domains",
            "redirectUrl"
          ]
        },
        "ShopOAuth2ClientResponseDto": {
          "type": "object",
          "properties": {
            "clientId": {
              "type": "string"
            },
            "domains": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "redirectUrl": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          "required": [
            "clientId",
            "domains",
            "redirectUrl"
          ]
        },
        "ProductTypesGridResponseDto": {
          "type": "object",
          "properties": {
            "title": {
              "type": "string"
            },
            "value": {
              "type": "number"
            }
          },
          "required": [
            "title",
            "value"
          ]
        },
        "UpdateReferralCustomCodeDto": {
          "type": "object",
          "properties": {
            "customCode": {
              "type": "string",
              "description": "Custom Code",
              "example": "CAMPAIGN_2020"
            }
          },
          "required": [
            "customCode"
          ]
        },
        "DeployShopContract": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "description": "type",
              "enum": [
                "CASPER",
                "POLYGON",
                "BINANCE",
                "REDBELLY",
                "BITLAYER",
                "ETH",
                "STACKS",
                "XRPLSIDECHAIN",
                "NEAR",
                "SKALE",
                "BASE",
                "LINEA",
                "SOLANA"
              ]
            },
            "transaction_id": {
              "type": "string",
              "description": "Transaction Id",
              "example": "0x5c2cfa8beb9d9bc38c690f08891cf40a0e90ad136dc88555904d49979965e1c4"
            },
            "deployedShopAddress": {
              "type": "string",
              "description": "Deployed Shop Address",
              "example": "0x7F2E4161AA52193372b2C33DEA3a35ff2dE7Aaef"
            },
            "deployedNFTAddress": {
              "type": "string",
              "description": "Deployed NFT Address",
              "example": "0x3d546f9E5c8d555dEc1D59e74B0FC44854184868"
            }
          },
          "required": [
            "type",
            "transaction_id",
            "deployedShopAddress",
            "deployedNFTAddress"
          ]
        },
        "UpdateProductLinkOptionsDto": {
          "type": "object",
          "properties": {
            "variantsStyle": {
              "type": "string",
              "description": "Variant Style",
              "example": "DROPDOWN"
            },
            "colorPallete": {
              "type": "string",
              "description": "Dark Mode",
              "example": "DARK"
            },
            "additionalNote": {
              "type": "boolean",
              "description": "Additinal Note for Order",
              "example": false
            },
            "logoVisibility": {
              "type": "boolean",
              "description": "Logo Visibility",
              "example": false
            }
          },
          "required": [
            "variantsStyle",
            "colorPallete",
            "logoVisibility"
          ]
        },
        "CircleDeployShopContractDto": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "description": "type",
              "enum": [
                "POLYGON",
                "ETH"
              ]
            }
          },
          "required": [
            "type"
          ]
        },
        "CircleWithdrawDto": {
          "type": "object",
          "properties": {
            "tokenId": {
              "type": "string",
              "description": "Token Id"
            },
            "amount": {
              "type": "string",
              "description": "Amount"
            }
          },
          "required": [
            "tokenId",
            "amount"
          ]
        },
        "ShopCreditType": {
          "type": "string",
          "enum": [
            "ORDER",
            "CREDIT_BALANCE",
            "AFFILIATE_SHARE",
            "SUBSCRIPTION_UPDATE",
            "GAMIFICATION_REWARD",
            "WITHDRAW",
            "REFERRAL",
            "CUSTOMER_SUPPORT_FEE",
            "BULK_ORDER",
            "MANUAL_CREDIT_ADJUSTMENT",
            "SUBSCRIPTION_RENEWAL"
          ]
        },
        "ShopCreditAmountType": {
          "type": "string",
          "enum": [
            "INCREASE",
            "DECREASE"
          ]
        },
        "CreditSummary": {
          "type": "object",
          "properties": {
            "total": {
              "type": "number",
              "description": "Total credit amount for all transactions",
              "example": 100.5,
              "minimum": 0
            },
            "count": {
              "type": "number",
              "description": "Total number of transactions",
              "example": 10,
              "minimum": 0
            },
            "breakdown": {
              "description": "Detailed breakdown by transaction type",
              "items": {
                "type": "array"
              },
              "type": "array"
            }
          },
          "required": [
            "total",
            "count",
            "breakdown"
          ]
        },
        "CreditAnalyticsResponseDto": {
          "type": "object",
          "properties": {
            "totalCreditAdded": {
              "type": "number",
              "description": "Total credit added in the period",
              "example": 100.5,
              "minimum": 0
            },
            "totalCreditRemoved": {
              "type": "number",
              "description": "Total credit removed in the period",
              "example": 100.5,
              "minimum": 0
            },
            "netChange": {
              "type": "number",
              "description": "Net change in credit (added - removed)",
              "example": 100.5,
              "minimum": 0
            },
            "additions": {
              "description": "Summary of credit additions",
              "allOf": [
                {
                  "$ref": "#/components/schemas/CreditSummary"
                }
              ]
            },
            "removals": {
              "description": "Summary of credit removals",
              "allOf": [
                {
                  "$ref": "#/components/schemas/CreditSummary"
                }
              ]
            },
            "periodStart": {
              "format": "date-time",
              "type": "string",
              "description": "Start of the analysis period",
              "example": "2024-01-01T00:00:00.000Z"
            },
            "periodEnd": {
              "format": "date-time",
              "type": "string",
              "description": "End of the analysis period",
              "example": "2024-01-01T00:00:00.000Z"
            }
          },
          "required": [
            "totalCreditAdded",
            "totalCreditRemoved",
            "netChange",
            "additions",
            "removals",
            "periodStart",
            "periodEnd"
          ]
        },
        "ShopSetupDto": {
          "type": "object",
          "properties": {
            "shop_url": {
              "type": "string",
              "example": "my-awesome-shop",
              "description": "Unique shop URL (must be unique across all shops)"
            },
            "name": {
              "type": "string",
              "example": "My Awesome Shop",
              "description": "Name of the shop to be displayed to customers"
            },
            "logo": {
              "type": "string",
              "example": "https://example.com/logo.png",
              "description": "URL to the shop logo image"
            },
            "hero_section": {
              "type": "string",
              "example": "https://example.com/hero.png",
              "description": "URL to the hero section image (displayed at the top of the shop page)"
            },
            "description": {
              "type": "string",
              "example": "This is an awesome shop selling great products.",
              "description": "Description of the shop and its products"
            }
          },
          "required": [
            "shop_url",
            "name"
          ]
        }
      }
    }
  },
  "customOptions": {
    "docExpansion": "none"
  }
};
  url = options.swaggerUrl || url
  let urls = options.swaggerUrls
  let customOptions = options.customOptions
  let spec1 = options.swaggerDoc
  let swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (let attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  let ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.initOAuth) {
    ui.initOAuth(customOptions.initOAuth)
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }
  
  window.ui = ui
}
