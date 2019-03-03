from .. import all_module as am
register_bp = am.Blueprint('register', __name__)


@register_bp.route('/register', methods=['POST'])
def register_user():
    data = am.request.get_json()
    if not data:
        return am.make_response("Bad Request, no data passed", 400)

    try:
        first = data["first_name"]
        last = data["last_name"]
        email = data["email"]
        username = data["username"]
        password = data['password']
    except KeyError:
        return am.make_response("Bad Request, missing/misspelled key", 400)

    if not am.clients.find_one({"username": username}):
        am.clients.insert_one({
            'first_name': first,
            'last_name': last,
            'username': username,
            'email': email,
            'password': am.bcrypt.generate_password_hash(password.encode(
                'utf-8')),

            'accounts': [
                {
                    'account_number': am.get_next_id('account_number'),
                    'alias': 'Checking Account',
                    'balance': 0.0,
                    'type': 'checking',
                    'active': True
                },
                {
                    'account_number': am.get_next_id('account_number'),
                    'alias': 'Saving Account',
                    'balance': 0.0,
                    'type': 'saving',
                    'active': True
                }
            ],
            'transactions': []
        })
        return am.make_response(('Registered', 201))

    return am.make_response(('Username already exist', 409))
