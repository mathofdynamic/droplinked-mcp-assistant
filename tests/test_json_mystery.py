# test_json_mystery.py
import json
import traceback # For more detailed error reporting if needed

# Define the raw JSON string.
# IMPORTANT: Replace the placeholder below with the *actual* single, continuous line of JSON
# text that was printed in your Uvicorn log after "--- Stage 3.2: Raw response_text:".
# It will be a very, very long line. Do NOT introduce any newlines into it yourself.
# It must start with "{" and end with "}".

raw_json_string = """{"statusCode":201,"message":null,"data":{"user":{"_id":"66389a37ae7db8fa370da55b","email":"mathofdynamic@gmail.com","status":"SHOP_INFO_COMPLETED","type":"SHOPBUILDER","firstname":"Jack","lastname":"Keys"},"shop":{"_id":"66389a38ae7db8fa370da55e","name":"mathofdynamic","ownerID":"66389a37ae7db8fa370da55b","productsTags":[],"imsTypeUpdated":true,"tags":[],"credit":3,"expressStripeAccountId":"acct_1Pk4YdR0shGVD6DN","onboardedExpressStripeAccount":false,"hasCustomDomain":false,"referralDetails":{"code":"YRJYQULM","customCode":"YRJYQULM","percent":15,"count":0,"income":0},"paymentMethods":[{"type":"STRIPE","isActive":true,"supportedChains":[],"_id":"66488e77de2f4b02c994d593"}],"createdAt":"2024-05-06T08:52:08.167Z","updatedAt":"2024-05-06T08:52:08.167Z","__v":6,"addressBookID":"66c996e4fb8f48f69c2009dd","description":"mathofdynamic","loginMethods":[{"name":"Metamask","isActivated":true,"type":"WALLET"},{"name":"Unstoppable Domains","isActivated":true,"type":"WALLET"},{"name":"Google","isActivated":true,"type":"SOCIAL"}],"pre_purchase_data_fetch":{"active":false,"title":""},"backgroundColor":"#141414","backgroundImage":"https://upload-file-droplinked.s3.amazonaws.com/803262ac0a3463d47af8b2c88d1e94c0b84216f31917ea3ac85e12e2fb44cf96.jpg","backgroundImageSecondary":"https://upload-file-droplinked.s3.amazonaws.com/803262ac0a3463d47af8b2c88d1e94c0b84216f31917ea3ac85e12e2fb44cf96.jpg","backgroundText":" Cyberpunk Store!","discordURL":"","facebookURL":"mohamadhosein.mohamadi.5","fullWidthHero":true,"headerIcon":"https://upload-file-droplinked.s3.amazonaws.com/809d5e5413d71fe1399e2bf48357d798c2e53a437d376bbc38e9c810e7e3e664.png","instagramURL":"mohamady.sfm","linkedinURL":"mohamad-h-mohamady-0285b8158","logo":"https://upload-file-flatlay.s3.us-west-2.amazonaws.com/452558960cf3f2146e7503c37f2fdf0605f35c992aaab1b95b96d38f99763988.png_or.png","messengerURL":"","productSectionText":"","shopDesign":{"fontfamily":"Manrope","headerBackground":"","isHeaderFixed":true,"hiroLayout":"center_text","hiroTextColor":"#ff65da","productListTitle":"🔴 Our amazing Spring Collection 🔴","backgroundBody":"#27262B","foreground":"#0A0A0A","textColorParagraphs":"#F9F9F6","iconHeaderColor":"#c844ff","footerLinks":[{"caption":"Nebula Website","link":"https://nebula-design.framer.website/"}],"bannerLinks":[],"isCollectionShown":true,"isLogoAsFavicon":true,"faviconURL":""},"telegramURL":"mathofdynamic","templateID":"6523b829f31b22884436a8da","template_options":{"--dlk-lyt":{"--dlk-lyt-hdr":{"--dlk-lyt-hdr-styles":{},"--dlk-lyt-hdr-lgo":{},"--dlk-lyt-hdr-icn":{"--dlk-lyt-hdr-icn-styles":{},"--dlk-lyt-hdr-icn-prfl":{"--dlk-lyt-hdr-icn-prfl-styles":{},"--dlk-lyt-hdr-icn-prfl-ppvr":{"--dlk-lyt-hdr-icn-prfl-ppvr-styles":{},"--dlk-lyt-hdr-icn-prfl-ppvr-btns":{}},"--dlk-lyt-hdr-icn-prfl-mdl":{"--dlk-lyt-hdr-icn-prfl-mdl-styles":{}}},"--dlk-lyt-hdr-icn-crt":{"--dlk-lyt-hdr-icn-crt-styles":{},"--dlk-lyt-hdr-icn-crt-ppvr":{"--dlk-lyt-hdr-icn-crt-ppvr-styles":{}}},"--dlk-lyt-hdr-icn-ntf":{"--dlk-lyt-hdr-icn-ntf-styles":{},"--dlk-lyt-hdr-icn-ntf-ppvr":{"--dlk-lyt-hdr-icn-ntf-ppvr-styles":{}}}}},"--dlk-lyt-ftr":{"--dlk-lyt-ftr-styles":{},"--dlk-lyt-ftr-lgo":{},"--dlk-lyt-ftr-txt":{}}},"--dlk-comps":{"--dlk-comps-btn":{"--dlk-comps-btn-styles":{},"--dlk-comps-btn-out":{"--dlk-comps-btn-out-styles":{},"--dlk-comps-btn-out-pseudo":{"_hover":{},"_active":{},"_focus":{}}},"--dlk-comps-btn-fill":{"--dlk-comps-btn-fill-styles":{},"--dlk-comps-btn-fill-pseudo":{"_hover":{},"_active":{},"_focus":{}}}},"--dlk-comps-inps":{"--dlk-comps-inps-def":{},"--dlk-comps-inps-dds":{}},"--dlk-comps-mdl":{"--dlk-comps-mdl-styles":{}},"--dlk-comps-bc":{"--dlk-comps-bc-actv":{},"--dlk-comps-bc-def":{}}},"--dlk-pgs":{"--dlk-pgs-styles":{},"--dlk-pgs-hme":{"--dlk-pgs-hme-styles":{},"--dlk-pgs-hme-sd":{"--dlk-pgs-hme-sd-styles":{},"--dlk-pgs-hme-sd-srch":{"--dlk-pgs-hme-sd-srch-styles":{},"--dlk-pgs-hme-sd-srch-inp":{},"--dlk-pgs-hme-sd-srch-icn":{}},"--dlk-pgs-hme-sd-prfl":{"--dlk-pgs-hme-sd-prfl-styles":{},"--dlk-pgs-hme-sd-prfl-soc":{"--dlk-pgs-hme-sd-prfl-soc-styles":{},"--dlk-pgs-hme-sd-prfl-soc-icn":{}},"--dlk-pgs-hme-sd-prfl-lgo":{},"--dlk-pgs-hme-sd-prfl-txt":{}}},"--dlk-pgs-hme-prods":{"--dlk-pgs-hme-prods-styles":{},"--dlk-pgs-hme-prods-prod":{"--dlk-pgs-hme-prods-prod-styles":{},"--dlk-pgs-hme-prods-prod-img":{},"--dlk-pgs-hme-prods-prod-ttl":{},"--dlk-pgs-hme-prods-prod-prc":{},"--dlk-pgs-hme-prods-prod-clr":{}}},"--dlk-pgs-hme-bnr":{"--dlk-pgs-hme-bnr-styles":{},"--dlk-pgs-hme-bnr-img":{},"--dlk-pgs-hme-bnr-txt":{"--dlk-pgs-hme-bnr-txt-styles":{},"--dlk-pgs-hme-bnr-txt-cntnt":{}}}},"--dlk-pgs-prod":{"--dlk-pgs-prod-styles":{},"--dlk-pgs-prod-dtls":{"--dlk-pgs-prod-dtls-styles":{},"--dlk-pgs-prod-dtls-grp":{"--dlk-pgs-prod-dtls-grp-styles":{},"--dlk-pgs-prod-dtls-grp-ttl":{},"--dlk-pgs-prod-dtls-grp-prc":{"--dlk-pgs-prod-dtls-grp-prc-styles":{},"--dlk-pgs-prod-dtls-grp-prc-def":{},"--dlk-pgs-prod-dtls-grp-prc-dis":{}},"--dlk-pgs-prod-dtls-grp-vars":{"--dlk-pgs-prod-dtls-grp-vars-clr":{"--dlk-pgs-prod-dtls-grp-vars-clr-styles":{},"--dlk-pgs-prod-dtls-grp-vars-clr-lbl":{},"--dlk-pgs-prod-dtls-grp-vars-clr-sel":{},"--dlk-pgs-prod-dtls-grp-vars-clr-opts":{"--dlk-pgs-prod-dtls-grp-vars-clr-opts-styles":{},"--dlk-pgs-prod-dtls-grp-vars-clr-opts-actv":{},"--dlk-pgs-prod-dtls-grp-vars-clr-opts-def":{}}},"--dlk-pgs-prod-dtls-grp-vars-sz":{"--dlk-pgs-prod-dtls-grp-vars-sz-styles":{},"--dlk-pgs-prod-dtls-grp-vars-sz-lbl":{},"--dlk-pgs-prod-dtls-grp-vars-sz-sel":{},"--dlk-pgs-prod-dtls-grp-vars-sz-opts":{"--dlk-pgs-prod-dtls-grp-vars-sz-opts-styles":{},"--dlk-pgs-prod-dtls-grp-vars-sz-opts-actv":{},"--dlk-pgs-prod-dtls-grp-vars-sz-opts-def":{}}}}}},"--dlk-pgs-prod-sldr":{"--dlk-pgs-prod-sldr-styles":{},"--dlk-pgs-prod-sldr-grp":{"--dlk-pgs-prod-sldr-grp-styles":{},"--dlk-pgs-prod-sldr-grp-img":{},"--dlk-pgs-prod-sldr-grp-lst":{"--dlk-pgs-prod-sldr-grp-lst-styles":{},"--dlk-pgs-prod-sldr-grp-lst-opts":{}}}}},"--dlk-pgs-ckt":{"--dlk-pgs-ckt-styles":{},"--dlk-pgs-ckt-accs":{"--dlk-pgs-ckt-accs-styles":{},"--dlk-pgs-ckt-accs-em":{"--dlk-pgs-ckt-accs-em-styles":{},"--dlk-pgs-ckt-accs-em-inp":{},"--dlk-pgs-ckt-accs-em-btn":{}},"--dlk-pgs-ckt-accs-addr":{"--dlk-pgs-ckt-accs-addr-styles":{},"--dlk-pgs-ckt-accs-addr-trig":{"--dlk-pgs-ckt-accs-addr-trig-styles":{},"--dlk-pgs-ckt-accs-addr-trig-txt":{},"--dlk-pgs-ckt-accs-addr-trig-icn":{}},"--dlk-pgs-ckt-accs-addr-mdl":{"--dlk-pgs-ckt-accs-addr-mdl-styles":{}},"--dlk-pgs-ckt-accs-addr-btn":{}},"--dlk-pgs-ckt-accs-shp":{"--dlk-pgs-ckt-accs-shp-styles":{}},"--dlk-pgs-ckt-accs-pmt":{"--dlk-pgs-ckt-accs-pmt-styles":{}}},"--dlk-pgs-ckt-gft":{"--dlk-pgs-ckt-gft-styles":{},"--dlk-pgs-ckt-gft-inp":{},"--dlk-pgs-ckt-gft-btn":{}},"--dlk-pgs-ckt-smry":{"--dlk-pgs-ckt-smry-styles":{},"--dlk-pgs-ckt-smry-hdr":{},"--dlk-pgs-ckt-smry-sep":{},"--dlk-pgs-ckt-smry-itm":{"--dlk-pgs-ckt-smry-itm-styles":{},"--dlk-pgs-ckt-smry-itm-img":{},"--dlk-pgs-ckt-smry-itm-ttl":{},"--dlk-pgs-ckt-smry-itm-qty":{},"--dlk-pgs-ckt-smry-itm-prc":{}}},"--dlk-pgs-ckt-totl":{"--dlk-pgs-ckt-totl-styles":{},"--dlk-pgs-ckt-totl-itm":{"--dlk-pgs-ckt-totl-itm-styles":{},"--dlk-pgs-ckt-totl-itm-ttl":{},"--dlk-pgs-ckt-totl-itm-prc":{}}}}}},"tiktokURL":"mathofdynamic2","twitterURL":"https://x.com/mathofdynamic","webURL":"","youtubeURL":"motion_time","imsType":"DROPLINKED","admins":["673b00fb85814032a4ac2ba1"],"automaticSubscriptionUpdate":true,"productDisplayByCollection":false,"subscriptionUpdateStatus":{"date":"2024-08-24T10:04:20.127Z","subscriptionId":"66c9a3ffe481365da8215e72","status":"PAID"},"productTileStyle":{"PRODUCT":{"CONTAINER":{"backgroundColor":"#FFFFFF","opacity":1,"darkMode":false,"type":"button","text":"Pay with LUMAI"},"IMAGE":{"display":true,"slider":true},"TITLE":{"color":"#000000"},"PRICE":{"color":"#000000"},"VARIANTS":{"displayType":"checkbox"},"BUTTON":{"text":"Tingle little mingle","backgroundColor":"#2ec99e","color":"#000000"}}},"launchDate":null,"productLinkOptions":{"additionalNote":false,"colorPallete":"LIGHT","logoVisibility":true,"variantsStyle":"DROPDOWN"},"circleWallets":[{"circleWalletId":"3c112d49-c950-5a2b-8eae-2d8c282058e6","state":"LIVE","chain":"ETH","circleChain":"ETH","address":"0x5a54a322191ddf7552e91a484d144785e1d9212e","isActive":true},{"circleWalletId":"b6e65545-a47e-50d0-9409-94db5f1acef5","state":"LIVE","chain":"POLYGON","circleChain":"MATIC","address":"0x5a54a322191ddf7552e91a484d144785e1d9212e","isActive":true},{"circleWalletId":"77ce5628-85d0-5885-89db-66a4d299f07b","state":"LIVE","chain":"SOLANA","circleChain":"SOL","address":"HbRxpcgrhRinaeKCjsXfFdzAJeSsST6ZkVdjDdgJKcgC","isActive":false}],"paymentWallets":[{"type":"EVM","destinationAddress":[{"destinationAddress":"0xfe452385b620117767f075c40c19fe558a370885","percent":100}],"_id":"67d0040b6a38268d8bd4cbc2"}],"currency":{"abbreviation":"USD","conversionRateToUSD":1,"symbol":"$","decimalPlaces":2,"thousandsSeparator":",","decimalSeparator":".","symbolPosition":"before","spaceBetweenAmountAndSymbol":false,"locale":"en-US"},"hasCompletedQuests":false,"isAgeRestricted":false,"isCatalogMode":false,"shopDomain":"droplinked.io/mathofdynamic","subscription":{"_id":"66c9b023e481365da8218edc","shopId":"66389a38ae7db8fa370da55e","subscriptionId":{"_id":"66c9a3ffe481365da8215e72","type":"ENTERPRISE","subOptionIds":[{"key":"event","value":"Unlimited"},{"key":"shop_designer","value":true},{"key":"analytics_dashboard","value":true},{"key":"advanced_analytics_reports","value":true},{"key":"google_login","value":true},{"key":"web3_network_login","value":"Unlimited"},{"key":"coupon_creation","value":true},{"key":"collection_management","value":true},{"key":"product_tile_display","value":true},{"key":"post_purchase_data_gathering","value":true},{"key":"order_management","value":true},{"key":"admin_panel","value":true},{"key":"custom_domain_integration","value":true},{"key":"shopfront_apis","value":true},{"key":"custom_fav_icon","value":true},{"key":"mint_to_merch","value":true},{"key":"physical_product","value":"Unlimited"},{"key":"digital_product","value":"Unlimited"},{"key":"print_on_demand","value":"Unlimited"},{"key":"drop","value":"Unlimited"},{"key":"web3_royalty_feature","value":true},{"key":"create_referral_code","value":true},{"key":"custom_shop_design","value":true},{"key":"stripe_payment","value":true},{"key":"web3_payment","value":"Unlimited"},{"key":"affiliate_panel","value":true},{"key":"rulesets","value":true},{"key":"easy_post_shipping","value":true},{"key":"custom_shipping","value":true},{"key":"tokenpay_platform","value":true},{"key":"tracking_shipment","value":true},{"key":"online_chat_support","value":true},{"key":"marketing_tools_email_sms","value":true},{"key":"internal_treasury_management","value":true},{"key":"warehouse_management","value":true}],"price":"Contact Us","__v":0},"purchaseStatus":"CONFIRMED","startsAt":"2024-08-24T09:48:52.312Z","expiresAt":"2025-08-24T10:14:40.902Z","status":"ACTIVE","__v":0,"updatedAt":"2025-05-13T12:09:21.384Z","autoRenew":true,"lastRenewalDate":"2024-08-24T09:48:52.312Z","renewalHistory":[{"date":"2024-08-24T09:48:52.312Z","planType":"ENTERPRISE","duration":null,"amount":null,"paymentMethod":"CREDIT"}],"daysUntilExpiration":92,"legalUsage":[{"key":"event","value":"Unlimited","remaining":"Unlimited","used":0,"all":"Unlimited","added":0},{"key":"web3_network_login","value":"Unlimited","remaining":"Unlimited","used":2,"all":"Unlimited","added":0},{"key":"physical_product","value":"Unlimited","remaining":"Unlimited","used":2,"all":"Unlimited","added":0},{"key":"digital_product","value":"Unlimited","remaining":"Unlimited","used":1,"all":"Unlimited","added":0},{"key":"print_on_demand","value":"Unlimited","remaining":"Unlimited","used":6,"all":"Unlimited","added":9},{"key":"drop","value":"Unlimited","remaining":"Unlimited","used":0,"all":"Unlimited","added":0},{"key":"web3_payment","value":"Unlimited","remaining":"Unlimited","used":0,"all":"Unlimited","added":0}]}},"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hdGhvZmR5bmFtaWNAZ21haWwuY29tIiwic3ViIjoiNjYzODlhMzdhZTdkYjhmYTM3MGRhNTViIiwidHlwZSI6IlNIT1BCVUlMREVSIiwic3RhdHVzIjoiU0hPUF9JTkZPX0NPTVBMRVRFRCIsInNob3BJZCI6IjY2Mzg5YTM4YWU3ZGI4ZmEzNzBkYTU1ZSIsImlhdCI6MTc0ODA4NTI4MSwiZXhwIjoxNzUwNjc3MjgxfQ.tQIiuYt1BTQJj3xTCgc2S7CUxRCf9dTt38kSTlOkg7s","refresh_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hdGhvZmR5bmFtaWNAZ21haWwuY29tIiwic3ViIjoiNjYzODlhMzdhZTdkYjhmYTM3MGRhNTViIiwidHlwZSI6IlNIT1BCVUlMREVSIiwic3RhdHVzIjoiU0hPUF9JTkZPX0NPTVBMRVRFRCIsInNob3BJZCI6IjY2Mzg5YTM4YWU3ZGI4ZmEzNzBkYTU1ZSIsImlhdCI6MTc0ODA4NTI4MSwiZXhwIjoxNzUwNjc3MjgxfQ.EtYGMmv4_eE_6XDSyJnsaQuexLn9G5XEZZDP6YT2J3o"}}"""

# ==============================================================================
# The rest of the script:
# ==============================================================================

print("--- Test Script Starting ---")

if "PASTE_THE_SINGLE_LINE_JSON_STRING_FROM_YOUR_LOGS_HERE" in raw_json_string or len(raw_json_string) < 50: # Basic check
    print("\nERROR: The 'raw_json_string' variable does not seem to contain the actual JSON data.")
    print("Please edit 'test_json_mystery.py' and replace the placeholder with the full, single-line JSON string from your Uvicorn logs.")
    print("--- Test Script Finished (Aborted) ---\n")
    exit()

print(f"\nRaw JSON String (first 200 chars and last 100 chars):")
print(f"Start: {raw_json_string[:200]}")
print(f"End:   {raw_json_string[-100:]}")


try:
    print("\n--- Attempting json.loads() ---")
    parsed_data = json.loads(raw_json_string)
    print(f"Successfully parsed with json.loads(). Parsed data type: {type(parsed_data)}")

    if isinstance(parsed_data, dict):
        print("\n--- Using repr() on the parsed dictionary (first 500 chars for brevity) ---")
        # Full repr can be too long for console.
        full_repr = repr(parsed_data)
        print(full_repr[:500] + ("..." if len(full_repr) > 500 else ""))


        print("\n--- Iterating through .items() of the parsed dictionary ---")
        all_keys_from_iteration = []
        iteration_found_access_token_value = None
        for k, v in parsed_data.items():
            all_keys_from_iteration.append(repr(k))
            print(f"  Item -> Key: {repr(k)}, Value Type: {type(v)}")
            if k == "access_token":
                iteration_found_access_token_value = v
        print(f"  All keys found during .items() iteration: {all_keys_from_iteration}")
        if iteration_found_access_token_value:
            print(f"  'access_token' value found via iteration: {str(iteration_found_access_token_value)[:50] + '...'}")
        else:
            print(f"  'access_token' NOT found via .items() iteration.")


        print("\n--- Checking with .keys() method ---")
        keys_from_method = list(parsed_data.keys())
        print(f"  Keys from .keys() method: {keys_from_method}")

        print("\n--- Checking specific keys with 'in' operator ---")
        key_to_check = "access_token"
        is_present_via_in = key_to_check in parsed_data
        print(f"  Is '{key_to_check}' in parsed_data? {is_present_via_in}")
        
        key_to_check_2 = "data"
        print(f"  Is '{key_to_check_2}' in parsed_data? {key_to_check_2 in parsed_data}")
        
        key_to_check_3 = "statusCode"
        print(f"  Is '{key_to_check_3}' in parsed_data? {key_to_check_3 in parsed_data}")

        print("\n--- Checking specific keys with .get() method ---")
        token_via_get = parsed_data.get("access_token")
        print(f"  Value from parsed_data.get('access_token'): {str(token_via_get)[:50] + '...' if token_via_get else 'None'}")

        data_via_get = parsed_data.get("data")
        print(f"  Type of value from parsed_data.get('data'): {type(data_via_get) if data_via_get is not None else 'None'}")
        
        status_via_get = parsed_data.get("statusCode")
        print(f"  Value from parsed_data.get('statusCode'): {status_via_get}")

        print("\n--- Direct bracket access (if 'in' operator was True) ---")
        if is_present_via_in:
            try:
                token_via_bracket = parsed_data["access_token"]
                print(f"  Value from parsed_data['access_token']: {str(token_via_bracket)[:50] + '...'}")
            except KeyError:
                print(f"  KeyError accessing parsed_data['access_token'] even though 'in' operator was True (VERY STRANGE).")
        else:
            print(f"  Skipping direct bracket access because 'in' operator was False for 'access_token'.")


    else:
        print("Parsed data is NOT a dictionary after json.loads()!")

except json.JSONDecodeError as e:
    print(f"\nJSONDecodeError during test script: {e}")
    print(f"Error occurred at char {e.pos}, line {e.lineno}, column {e.colno}")
    # Print the vicinity of the error
    error_vicinity_start = max(0, e.pos - 50)
    error_vicinity_end = min(len(raw_json_string), e.pos + 50)
    print(f"Vicinity of error in JSON string (char {error_vicinity_start}-{error_vicinity_end}):")
    print(f"...{raw_json_string[error_vicinity_start:error_vicinity_end]}...")

except Exception as e:
    print(f"\nAn unexpected error occurred during test script: {e}")
    traceback.print_exc()


print("\n--- Test Script Finished ---")