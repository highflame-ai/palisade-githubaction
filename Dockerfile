FROM python:3.12-slim

# Install Palisade from PyPI
RUN pip install --no-cache-dir palisade

# Copy entrypoint
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
