Knock.setup do |config|

  config.token_secret_signature_key = -> { Rails.application.credentials.read }


end
